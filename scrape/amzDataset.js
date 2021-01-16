var unirest = require("unirest");
const {key, host} = require('../config/keys');

module.exports = () => {

  const req = unirest("GET", "https://amazon-product-reviews-keywords.p.rapidapi.com/product/reviews");
  req.query({
    "asin": "B01N27QVPA",
    "page": "1",
    "country": "IN",
    "top": "0"
  });

  req.headers({
      "x-rapidapi-key": key,
      "x-rapidapi-host": host,
    "useQueryString": true
  });


  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
  });

}

/*
{
  next_page: 2,
  total_reviews: 46,
  stars_stat: { '1': '15%', '2': '4%', '3': '3%', '4': '15%', '5': '63%' },
  reviews: [
    {
      id: 'R2HDBA35V2HQA2',
      asin: [Object],
      review_data: 'Reviewed in India on 13 January 2021',
      date: [Object],
      name: 'Cucks94',
      rating: 1,
      title: 'they sent me just 1 keyboard mouse too',
      review: 'They expect you to pay >7000 INR for 1 basic keyboard mouse.So be prepared .Ask for these to be sold separately not as a 10 packDo not buy a 10 pack unless you want to be surprised and shocked at the same time.',
      verified_purchase: false
    },
    {
      id: 'R2DDWF7H2UBYF6',
      asin: [Object],
      review_data: 'Reviewed in India on 27 December 2020',
      date: [Object],
      name: 'Amazon Customer',
      rating: 5,
      title: 'About keyboard',
      review: 'One of the good keyboard I have ever seen. Fantastic keyboard please buy it. Amazon is good product output company.',
      verified_purchase: false
    },
    {
      id: 'R1798EV3GFXWPP',
      asin: [Object],
      review_data: 'Reviewed in India on 13 December 2020',
      date: [Object],
      name: 'Sandesh s',
      rating: 1,
      title: 'Product says 10 piece. But they deliver only one piece!',
      review: 'I have ordered this product multiple times from different accounts. The description says 10 piece. but they deliver only 1 piece. Asking for refund is a painful process. I am forced to purchase different brands even tho amazon basics is the best. sad.',
      verified_purchase: true
    }
  ]
}
*/