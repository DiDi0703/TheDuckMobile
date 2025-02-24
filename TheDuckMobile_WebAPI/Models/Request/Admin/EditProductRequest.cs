﻿using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Models.Request.Admin
{
    public class EditProductRequest
    {
        [Required(ErrorMessage = "Product name is required")]
        public string? ProductName { get; set; }
        [Required(ErrorMessage = "Product description is required")]
        public string? ProductDescription { get; set; }
        [Required(ErrorMessage = "OS is required")]
        public int OSId { get; set; }
        [Required(ErrorMessage = "Brand is required")]
        public int BrandId { get; set; }
        [Required(ErrorMessage = "Catalog is required")]
        public int CatalogId { get; set; }
    }
}
