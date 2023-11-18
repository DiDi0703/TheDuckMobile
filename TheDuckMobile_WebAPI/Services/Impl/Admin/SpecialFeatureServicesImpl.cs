﻿using Microsoft.EntityFrameworkCore;
using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.ErrorHandler;
using TheDuckMobile_WebAPI.Models.Request.Admin;
using TheDuckMobile_WebAPI.Services.Admin;

namespace TheDuckMobile_WebAPI.Services.Impl.Admin
{
    public class SpecialFeatureServicesImpl : ISpecialFeatureServices
    {
        private readonly DataContext _context;

        public SpecialFeatureServicesImpl(DataContext context)
        {
            _context = context;
        }

        public async Task<SpecialFeature> AddSpecialFeature(SpecialFeatureRequest request)
        {
            var specialFeature = new SpecialFeature
            {
                SpecialFeatureName = request.SpecialFeatureName,
                CreatedAt = DateTime.Now,
                LastModifiedAt = DateTime.Now,
                IsDeleted = false
            };

            await _context.SpecialFeatures.AddAsync(specialFeature);
            await _context.SaveChangesAsync();

            return specialFeature;
        }

        public async Task<bool> DeleteSpecialFeature(int id)
        {
            var specialFeature = await GetSpecialFeatureById(id);

            specialFeature.IsDeleted = true;
            specialFeature.LastModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return specialFeature.IsDeleted;
        }

        public async Task<ICollection<SpecialFeature>> GetAllSpecialFeatures()
        {
            var specailFeatures = await _context.SpecialFeatures
                .Where(s => s.IsDeleted == false)
                .ToListAsync();

            return specailFeatures;
        }

        public async Task<SpecialFeature> GetSpecialFeatureById(int id)
        {
            var specialFeature = await _context.SpecialFeatures
                .FirstOrDefaultAsync(s => s.SpecialFeatureId == id && s.IsDeleted == false);

            if (specialFeature == null)
                throw new CustomNotFoundException("Can't found special feature");

            return specialFeature;
        }

        public async Task<SpecialFeature> UpdateSpecialFeature(int id, SpecialFeatureRequest request)
        {
            var specialFeature = await _context.SpecialFeatures
                .FirstOrDefaultAsync(s => s.SpecialFeatureId == id && s.IsDeleted == false);

            if (specialFeature == null)
                throw new CustomNotFoundException("Can't found special feature");

            if (request.SpecialFeatureName == null || request.SpecialFeatureName == "")
                throw new BadHttpRequestException("Special feature name can't be null or empty");

            specialFeature.SpecialFeatureName = request.SpecialFeatureName;
            specialFeature.LastModifiedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return specialFeature;
        }
    }
}
