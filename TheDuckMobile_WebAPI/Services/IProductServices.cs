﻿using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request;
using TheDuckMobile_WebAPI.Models.Response;

namespace TheDuckMobile_WebAPI.Services
{
    public interface IProductServices
    {
        public Task<List<ProductHomeResponse>> GetBestSellingProducts(int numberOfProducts);
        public Task<List<ProductHomeResponse>> GetNewestProducts(int numberOfProducts);
        public Task<List<ProductHomeResponse>> GetHighlyRatedProducts(int numberOfProducts);
        public Task<PaginationResponse> SearchProduct(string query, string? orderBy, int page, int limit);
        public Task<ProductDetailResponse> GetProductVersionsByProductId(Guid productId);
        public Task<List<ProductHomeResponse>> GetProductRelative(Guid productId);
        public Task<List<ProductCartResponse>> GetProductCartDetails(List<UserCartItem> userCartItems);
    }
}
