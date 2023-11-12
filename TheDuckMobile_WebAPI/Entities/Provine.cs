﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace TheDuckMobile_WebAPI.Entities
{
    public class Provine
    {
        private readonly ILazyLoader? _lazyLoader;
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProvinceId { get; set; }
        [Required]
        public string? ProvineName { get; set; }

        //Chứa danh sách các district (1 provine chứa nhiều district)
        private ICollection<District>? _districts;
        public virtual ICollection<District>? Districts
        {
            get => _lazyLoader.Load(this, ref _districts);
            set => _districts = value;
        }

        public Provine()
        {

        }

        public Provine(ILazyLoader lazyLoader)
        {
            _lazyLoader = lazyLoader;
        }
    }
}
