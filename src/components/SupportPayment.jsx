import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const SupportPayment = () => {
  const paymentLogos = [
    {
      name: "GoPay",
      imgSrc:
        "https://i.pinimg.com/originals/94/3c/97/943c971903518e53ffd324dd51e46a90.png",
    },
    {
      name: "OVO",
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg",
    },
    {
      name: "Dana",
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg",
    },
    {
      name: "LinkAja",
      imgSrc:
        "https://bewara.co.id/wp-content/uploads/2023/05/link-aja-e1684593519358.png",
    },
    {
      name: "ShopeePay",
      imgSrc: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg",
    },
    {
      name: "PayPal",
      imgSrc: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
    {
      name: "Visa",
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    },
    {
      name: "Mastercard",
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg",
    },
    {
      name: "Alipay",
      imgSrc: "https://upload.wikimedia.org/wikipedia/id/b/ba/Logo_Alipay.png",
    },
    {
      name: "Alfamart",
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/ALFAMART_LOGO_BARU.png",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        Supported Payment Methods
      </h2>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="my-8"
      >
        {paymentLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center">
              <img
                src={logo.imgSrc}
                alt={logo.name}
                className="h-24 w-24 object-contain mx-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SupportPayment;
