﻿using ASPWebAPI.Entities;
using System.ComponentModel.DataAnnotations;

namespace TheDuckMobile_WebAPI.Entities
{

    public class Customer : User
    {
        // public virtual ICollection<FeedBack> FeedBacks { get; set; }

        public virtual ICollection<Vote> Votes { get; set; }
    }
}
