﻿using TheDuckMobile_WebAPI.Entities;

namespace TheDuckMobile_WebAPI.Models.Response.Admin
{
    public class CouponListResponse
    {
        public Guid CouponId { get; set; }
        public string? CouponCode { get; set; }
        public int Discount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CurrentUse { get; set; }
        public bool IsDeleted { get; set; }

        public CouponListResponse(Coupon coupon)
        {
            CouponId = coupon.CouponId;
            CouponCode = coupon.CouponCode;
            Discount = coupon.Discount;
            StartDate = coupon.StartDate;
            EndDate = coupon.EndDate;
            CurrentUse = coupon.CurrentUse;
            IsDeleted = coupon.IsDeleted;
        }
    }
}
