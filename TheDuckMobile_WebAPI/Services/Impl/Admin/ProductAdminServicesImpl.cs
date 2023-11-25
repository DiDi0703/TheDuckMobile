﻿using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Models.Response.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class ProductAdminServicesImpl : IProductAdminServices
    {
        private readonly DataContext _context;
        private readonly ICloudinaryServices _cloudinaryServices;

        public ProductAdminServicesImpl(DataContext context, ICloudinaryServices cloudinaryServices)
        {
            _context = context;
            _cloudinaryServices = cloudinaryServices;

        }

        public async Task<List<ProductListResponse>> GetAllProducts()
        {
            var products = await _context.Products
                .Include(p => p.Votes)
                .ToListAsync();
            return products.Select(p => new ProductListResponse(p)).ToList();
        }

        public async Task<ProductDetailResponse?> GetProductById(Guid productId)
        {
            var product = await _context.Products
                .Include(p => p.Votes)
                .Include(p => p.Catalog)
                .Include(p => p.Brand)
                .Include(p => p.OS)
                .Include(p => p.ProductVersions)
                .FirstOrDefaultAsync(p => p.ProductId == productId);
            if (product == null)
                return null;
            return new ProductDetailResponse(product);
        }

        public async Task<Product?> EditProduct(Guid productId, EditProductRequest request)
        {
            var product = await _context
                .Products
                .FirstOrDefaultAsync(p => p.ProductId == productId);
            if (product == null)
                throw new CustomNotFoundException("Can't found product");

            var os = await _context
                .OSs
                .FirstOrDefaultAsync(
                    o => o.OSId == request.OSId && o.IsDeleted == false
                );
            if (os == null)
                throw new CustomNotFoundException("Can't found OS");

            var brand = await _context
                .Brands
                .FirstOrDefaultAsync(
                    b => b.BrandId == request.BrandId && b.IsDeleted == false
                );
            if (brand == null)
                throw new CustomNotFoundException("Can't found brand");

            // Catalog
            var catalog = await _context
                .Catalogs
                .FirstOrDefaultAsync(
                    c => c.CatalogId == request.CatalogId
                    && c.IsDeleted == false
                    );
            if (catalog == null)
                throw new CustomNotFoundException("Can't found catalog");

            product.ProductName = request.ProductName;
            product.ProductDescription = request.ProductDescription;
            product.Quantity = request.Quantity;
            product.OS = os;
            product.Catalog = catalog;
            product.Brand = brand;
            product.LastModifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<Product?> DeleteProduct(Guid productId)
        {
            var product = await _context
                .Products
                .FirstOrDefaultAsync(p => p.ProductId == productId);

            if (product == null)
                return null;

            product.IsDeleted = true;
            product.LastModifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<Product?> RestoreProduct(Guid productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == productId);

            if (product == null)
                return null;

            product.IsDeleted = false;
            product.LastModifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<Product?> AddProduct(AddProductRequest request)
        {
            // OS
            var os = await _context
                .OSs
                .FirstOrDefaultAsync(
                    o => o.OSId == request.OSId && o.IsDeleted == false
                );
            if (os == null)
                throw new CustomNotFoundException("Can't found OS");

            // Brand
            var brand = await _context
                .Brands
                .FirstOrDefaultAsync(
                    b => b.BrandId == request.BrandId && b.IsDeleted == false
                );
            if (brand == null)
                throw new CustomNotFoundException("Can't found brand");

            // Thumbnail
            if (request.Thumbnail == null)
                throw new BadHttpRequestException("Thumbnail is required");
            var thumbnail = await _cloudinaryServices.UploadImage(request.Thumbnail);

            // Catalog
            var catalog = await _context
                .Catalogs
                .FirstOrDefaultAsync(
                    c => c.CatalogId == request.CatalogId 
                    && c.IsDeleted == false
            );
            if (catalog == null)
                throw new CustomNotFoundException("Can't found catalog");

            var product = new Product
            {
                ProductName = request.ProductName,
                ProductDescription = request.ProductDescription,
                Quantity = request.Quantity,
                OS = os,
                Brand = brand,
                Catalog = catalog,
                IsDeleted = false,
                ProductPrice = 0,
                PromotionPrice = 0,
                Sold = 0,
                Thumbnail = thumbnail,
                CreatedAt = DateTime.Now,
                LastModifiedAt = DateTime.Now
            };

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            return product;
        }
    }
}
