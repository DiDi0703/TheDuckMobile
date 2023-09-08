﻿namespace TheDuckMobile_WebAPI.Entities
{
    public class Ward
    {
        public Guid WardId { get; set; }
        public string WardName { get; set; }

        //Tham chiếu tới bảng district
        public Guid DistrictId { get; set; }
        public District District { get; set; }

        //Chứa danh sách các address
        public virtual ICollection<Address> Addresses { get; set; }

    }
}
