using MapaCenBackend.DTO;
using MapaCenBackend.Entities;
using MapaCenBackend.Services;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Utilities;
using System.Diagnostics;
using System.Drawing;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Drawing;

namespace MapaCenBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductDetailController
    {
        private ProductService productService;
        private UserService userService;
        private PriceService priceService;
        public ProductDetailController()
        {
            RatingService ratingService = new RatingService();
            CommentService commentService = new CommentService();
            this.priceService = new PriceService(commentService, ratingService);
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
                string image64 = "";
                byte[] imageBytes = { };
                Bitmap image;
                if (product.getPicture() == "")
                {   
                    image = new Bitmap(System.IO.Directory.GetCurrentDirectory() + """\ProductsImages\"""+ """empty.jpg""");

                    
                }
                else
                {
                    //if (picture_path != null && picture_path != "")

                    image = new Bitmap(System.IO.Directory.GetCurrentDirectory() + """\ProductsImages\""" + product.getPicture());
                }

                // Zamiana obrazu na ciąg Base64
                image64 = ImageToBase64(image);

                // Wyświetlenie ciągu Base64
                Console.WriteLine(image64);

                return new ProductDetailResponse(product.getProductName(), image64, average);
            }
            catch (Exception ex)
            {
                return new ProductDetailResponse();
            }
        }

        static string ImageToBase64(Bitmap image)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                // Zapisz obraz do strumienia w formacie JPEG (możesz dostosować format)
                image.Save(ms, System.Drawing.Imaging.ImageFormat.Png);

                // Zamień strumień na tablicę bajtów
                byte[] imageBytes = ms.ToArray();

                // Zamień tablicę bajtów na ciąg Base64
                string base64String = Convert.ToBase64String(imageBytes);

                return base64String;
            }
        }

        [HttpGet("prices")]
        public List<PriceDTO> GetPricesFromRegion([FromQuery]int productId, [FromQuery]int regionId)
        {
            List<PriceDTO> pricesDTO = priceService.selectPricesFromRegion(productId, regionId)
                 .Select(source => new PriceDTO(
                    source.getPriceId(),
                    source.getShopAddress(),
                    source.getDate(),
                    source.getPriceValue(),
                    getRatingsDTO(source.getRatings()),
                    getCommentsDTO(source.getComments())
                    )).ToList();
            return pricesDTO;
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
