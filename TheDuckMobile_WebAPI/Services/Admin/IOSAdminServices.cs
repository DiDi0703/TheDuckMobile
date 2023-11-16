﻿using TheDuckMobile_WebAPI.Entities;
using TheDuckMobile_WebAPI.Models.Request.Admin;

namespace TheDuckMobile_WebAPI.Services.Admin
{
    public interface IOSAdminServices
    {
        public Task<ICollection<OS>> GetAllOS();
        public Task<OS> GetOSById(int id);
        public Task<OS> AddOS(OSRequest request);
        public Task<OS> UpdateOS(int id, OSRequest request);
        public Task<bool> DeleteOS(int id);
    }
}
