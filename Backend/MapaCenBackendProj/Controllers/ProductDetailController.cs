﻿using MapaCenBackend.DTO;
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
                    .Select(source => new PriceDTO(source.getShopAddress(), 
                    source.getDate(),
                    source.getPriceValue(),
                    getRatingsDTO(source.getRatings()), 
                    getCommentsDTO(source.getComments())
                    )).ToList();
                return new ProductDetailResponse(product.getProductName(), product.getPicture(), pricesDTOs);
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
                CommentDTO commentDTO = new CommentDTO(userService.selectUsername(comment.getUserId()), comment.getDate(), comment.getContent(), comment.getPicture());
                commentsDTO.Add(commentDTO);
            }
            return commentsDTO;
        }
    }
}
