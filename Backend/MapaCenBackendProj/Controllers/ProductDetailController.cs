using MapaCenBackend.DTO;
using MapaCenBackend.Entities;
using MapaCenBackend.Services;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Utilities;
using System.Diagnostics;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;


namespace MapaCenBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductDetailController
    {
        private ProductService productService;
        private UserService userService;
        public ProductDetailController()
        {
            RatingService ratingService = new RatingService();
            CommentService commentService = new CommentService();
            PriceService priceService = new PriceService(commentService, ratingService);
            this.productService = new ProductService(priceService);
            this.userService = new UserService();
        }
        [HttpGet("products/{productId}")]
        public ProductDetailResponse productDetails([FromRoute] int productId)
        {
            try
            {
                Product product = productService.selectProduct(productId);
                List<PriceDTO> pricesDTOs = product.getPrices()
                    .Select(source => new PriceDTO(
                    source.getPriceId(),
                    source.getShopAddress(), 
                    source.getDate(),
                    source.getPriceValue(),
                    getRatingsDTO(source.getRatings()), 
                    getCommentsDTO(source.getComments())
                    )).ToList();
                double sumPrice = 0;
                int i = 0;
                DateTime currentDate = DateTime.Now;
                int lastMonth = currentDate.Month - 1;
                int lastYear = currentDate.Year;
                if(lastMonth < 1)
                {
                    lastMonth = 12;
                    lastYear--;
                }
                foreach(PriceDTO pr in pricesDTOs)
                {
                    int month = int.Parse(pr.date.Substring(3, 2));
                    int year = int.Parse(pr.date.Substring(6, 4));
                    if(month == lastMonth && year == lastYear)
                    {
                        sumPrice += pr.priceValue;
                        i++;
                    }
                }
                double average;
                if(i > 0)
                {
                    average = sumPrice / i;
                } else
                {
                    average = 0;
                }
                return new ProductDetailResponse(product.getProductName(), product.getPicture(), average, pricesDTOs);
            }
            catch (Exception ex)
            {
                return new ProductDetailResponse();
            }
        }
        private List<RatingDTO> getRatingsDTO(List<Rating> ratings)
        {
            var ratingsDTO = new List<RatingDTO>();
            foreach(Rating rating in ratings)
            {
                string username = userService.selectUsername(rating.getUserId());
                RatingDTO ratingDTO = new RatingDTO(username, rating.getIsPositive());
                ratingsDTO.Add(ratingDTO);
            }
            return ratingsDTO;
        }
        private List<CommentDTO> getCommentsDTO(List<Comment> comments)
        {
            var commentsDTO = new List<CommentDTO>();
            foreach (Comment comment in comments)
            {
                CommentDTO commentDTO = new CommentDTO(userService.selectUsername(comment.getUserId()), comment.getDate(), comment.getContent(),comment.getPicture());
                commentsDTO.Add(commentDTO);
            }
            return commentsDTO;
        }
    }
}
