import { client, urlFor } from 'lib/client';
import { BannerTypes, ProductTypes } from 'lib/dataTypes';
import React from 'react';

import { FooterBanner, HeroBanner, Product } from '@/components';

interface HomeProps {
  productsData: ProductTypes[];
  bannerData: BannerTypes[];
}

const Home = ({ productsData, bannerData }: HomeProps) => {
  // console.log('product', productsData);
  // console.log(typeof productsData);
  // console.log('banner', bannerData);
  // console.log(typeof bannerData);
  // console.log('banner');
  // console.log(urlFor(bannerData[0].image));
  // console.log('product');
  // console.log(urlFor(productsData[0].image));
  return (
    <>
      <HeroBanner
        largeText={bannerData[0]?.largeText}
        product={bannerData[0].product}
        description={bannerData[0].desc}
        discount={bannerData[0].discount}
        image={urlFor(bannerData[0].image).url()}
        buttonText={bannerData[0].buttonText}
      />
      <div className='mt-4 flex text-center'>
        <div className='container mx-auto'>
          <h2 className='text-4xl font-extrabold text-gray-900'>
            Best Seller Products
          </h2>
          <p>speaker There are many variations passages</p>
        </div>
      </div>

      <div className='container mx-auto mt-4 grid grid-cols-4 gap-4'>
        {productsData?.map((product) => (
          <Product
            key={product._id}
            name={product.name}
            price={product.price}
            slug={product.slug}
            image={urlFor(product.image && product.image[0]).url()}
          />
        ))}
      </div>

      <FooterBanner />
    </>
  );
};

export async function getServerSideProps() {
  const productQuery = '*[_type == "product"]';
  const productsData = await client.fetch(productQuery);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { productsData, bannerData },
  };
}

export default Home;
