const sampleListings = [
    {
      title: "Seaside Villa in Santorini",
      description:
        "Bask in the beauty of the Aegean Sea from this stunning whitewashed villa perched on a cliff in Santorini.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2800,
      location: "Santorini",
      country: "Greece",
    },
    {
      title: "Cozy Chalet in Chamonix",
      description:
        "Nestled in the French Alps, this charming chalet offers breathtaking views and direct access to ski trails.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1542044896530-05d85be9b584?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 3200,
      location: "Chamonix",
      country: "France",
    },
    {
      title: "Riverside Cabin in Patagonia",
      description:
        "Unwind by the river in this rustic cabin surrounded by the wild beauty of Patagonia's untouched landscapes.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1100,
      location: "Patagonia",
      country: "Argentina",
    },
    {
      title: "Urban Loft in Berlin",
      description:
        "Experience Berlin's vibrant culture from this sleek, modern loft in the trendy Kreuzberg district.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1495314736024-fa5e4b37b979?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1400,
      location: "Berlin",
      country: "Germany",
    },
    {
      title: "Jungle Bungalow in Tulum",
      description:
        "Immerse yourself in nature in this eco-friendly bungalow steps away from Tulum's pristine beaches.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1700,
      location: "Tulum",
      country: "Mexico",
    },
    {
      title: "Lakeside Retreat in Queenstown",
      description:
        "Relax by Lake Wakatipu in this serene retreat with stunning mountain views in New Zealand's adventure capital.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2000,
      location: "Queenstown",
      country: "New Zealand",
    },
    {
      title: "Desert Tent in Morocco",
      description:
        "Sleep under the stars in this luxurious tented camp amidst the rolling dunes of the Sahara.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1519981593452-666cf05569a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1300,
      location: "Sahara Desert",
      country: "Morocco",
    },
    {
      title: "Clifftop Cottage in Cornwall",
      description:
        "Enjoy dramatic sea views from this quaint cottage perched on the rugged cliffs of Cornwall.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1506126613408-eca37f39d26f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1500,
      location: "Cornwall",
      country: "United Kingdom",
    },
    {
      title: "Skyline Penthouse in Singapore",
      description:
        "Live above the clouds in this sleek penthouse with panoramic views of Singapore's dazzling skyline.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 4500,
      location: "Singapore",
      country: "Singapore",
    },
    {
      title: "Vineyard Estate in Bordeaux",
      description:
        "Savor the taste of fine wine in this elegant estate surrounded by rolling vineyards in Bordeaux.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1504548840739-580b10ae7715?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2900,
      location: "Bordeaux",
      country: "France",
    },
    {
      title: "Oceanfront Hut in Seychelles",
      description:
        "Wake up to the sound of waves in this idyllic beach hut on a secluded Seychelles island.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2200,
      location: "Seychelles",
      country: "Seychelles",
    },
    {
      title: "Forest Lodge in British Columbia",
      description:
        "Reconnect with nature in this cozy lodge surrounded by towering pines in Canada's wilderness.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1600,
      location: "British Columbia",
      country: "Canada",
    },
    {
      title: "Rooftop Apartment in Lisbon",
      description:
        "Soak in the charm of Lisbon from this sunny rooftop apartment overlooking the Tagus River.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1300,
      location: "Lisbon",
      country: "Portugal",
    },
    {
      title: "Mountain Yurt in Mongolia",
      description:
        "Experience nomadic life in this traditional yurt set against the vast Mongolian steppes.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 900,
      location: "Ulaanbaatar",
      country: "Mongolia",
    },
    {
      title: "Beach Villa in Mauritius",
      description:
        "Unwind in paradise in this luxurious villa with direct access to Mauritius' turquoise waters.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1497436072909-60f69c25b263?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2700,
      location: "Mauritius",
      country: "Mauritius",
    },
    {
      title: "Countryside Farmhouse in Provence",
      description:
        "Escape to the lavender fields of Provence in this charming farmhouse with rustic elegance.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1500384066616-8a8d7432313c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1900,
      location: "Provence",
      country: "France",
    },
    {
      title: "Glacier Cabin in Iceland",
      description:
        "Stay warm in this cozy cabin with stunning views of Iceland's glaciers and northern lights.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2100,
      location: "Reykjavik",
      country: "Iceland",
    },
    {
      title: "City Studio in Seoul",
      description:
        "Dive into the bustling energy of Seoul from this chic studio in the heart of Gangnam.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1500,
      location: "Seoul",
      country: "South Korea",
    },
    {
      title: "Coastal Retreat in Cape Town",
      description:
        "Relax with panoramic ocean views from this modern retreat along Cape Town's stunning coastline.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1505855659705-083984 nad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2300,
      location: "Cape Town",
      country: "South Africa",
    },
    {
      title: "Hilltop Villa in Amalfi",
      description:
        "Overlook the colorful Amalfi Coast from this luxurious villa with a private terrace.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1504624720567-64a41aa25d70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 3100,
      location: "Amalfi",
      country: "Italy",
    },
    {
      title: "Rainforest Cabin in Queensland",
      description:
        "Surround yourself with the sounds of the rainforest in this secluded cabin near the Great Barrier Reef.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1446484851834-734b1eb69f51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1400,
      location: "Queensland",
      country: "Australia",
    },
    {
      title: "Harbor House in Sydney",
      description:
        "Enjoy iconic views of Sydney Harbour from this stylish house near the Opera House.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2600,
      location: "Sydney",
      country: "Australia",
    },
    {
      title: "Snow Lodge in Hokkaido",
      description:
        "Ski into this cozy lodge surrounded by the powdery snow of Japan's northern island.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2400,
      location: "Hokkaido",
      country: "Japan",
    },
    {
      title: "Island Bungalow in Bora Bora",
      description:
        "Live over the water in this luxurious bungalow with crystal-clear lagoons all around.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 5500,
      location: "Bora Bora",
      country: "French Polynesia",
    },
    {
      title: "Historic Townhouse in Prague",
      description:
        "Step into old-world charm in this beautifully restored townhouse in Prague's historic center.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1800,
      location: "Prague",
      country: "Czech Republic",
    },
    {
      title: "Lake House in Lucerne",
      description:
        "Relax by Lake Lucerne in this modern house with stunning views of the Swiss Alps.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2500,
      location: "Lucerne",
      country: "Switzerland",
    },
    {
      title: "Beach Shack in Byron Bay",
      description:
        "Embrace laid-back vibes in this surfside shack steps from Byron Bay's golden beaches.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1600,
      location: "Byron Bay",
      country: "Australia",
    },
    {
      title: "Rustic Barn in Vermont",
      description:
        "Cozy up in this converted barn surrounded by Vermont's rolling hills and autumn foliage.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1505840717430-882943855a73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1200,
      location: "Vermont",
      country: "United States",
    },
    {
      title: "Floating Villa in Kerala",
      description:
        "Cruise the backwaters of Kerala in this traditional houseboat turned luxurious villa.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1593696140826-73e8e3e9a6e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2000,
      location: "Kerala",
      country: "India",
    },
    {
      title: "Volcano Cabin in Hawaii",
      description:
        "Stay near Hawaii’s active volcanoes in this rustic cabin with views of lava flows.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1900,
      location: "Big Island",
      country: "United States",
    },
    {
      title: "Medieval Tower in Edinburgh",
      description:
        "Live like a laird in this historic tower overlooking Edinburgh’s ancient streets.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2200,
      location: "Edinburgh",
      country: "United Kingdom",
    },
    {
      title: "Safari Tent in Kruger",
      description:
        "Spot the Big Five from this luxurious tented camp in South Africa’s Kruger National Park.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 3500,
      location: "Kruger National Park",
      country: "South Africa",
    },
    {
      title: "Arctic Igloo in Lapland",
      description:
        "Sleep in a glass igloo under the aurora borealis in the snowy wilds of Finnish Lapland.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 3000,
      location: "Lapland",
      country: "Finland",
    },
    {
      title: "Cave House in Cappadocia",
      description:
        "Stay in a traditional cave house carved into the fairy chimneys of Cappadocia.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1531576991717-dff427a3f527?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1800,
      location: "Cappadocia",
      country: "Turkey",
    },
    {
      title: "Bayfront Loft in San Francisco",
      description:
        "Enjoy sweeping views of the Golden Gate Bridge from this modern loft in the Bay Area.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2800,
      location: "San Francisco",
      country: "United States",
    },
    {
      title: "Rice Field Villa in Ubud",
      description:
        "Find peace in this serene villa overlooking the lush rice paddies of Bali’s cultural heart.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2100,
      location: "Ubud",
      country: "Indonesia",
    },
    {
      title: "Fjords Cabin in Norway",
      description:
        "Marvel at Norway’s dramatic fjords from this cozy cabin perched above the water.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2300,
      location: "Bergen",
      country: "Norway",
    },
    {
      title: "Hill Cottage in Darjeeling",
      description:
        "Sip tea amidst the misty hills of Darjeeling in this charming colonial-era cottage.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1400,
      location: "Darjeeling",
      country: "India",
    },
    {
      title: "Canopy Hut in Amazon",
      description:
        "Sleep high in the treetops of the Amazon rainforest in this adventurous jungle hut.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1505826758250-155260e730c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1700,
      location: "Manaus",
      country: "Brazil",
    },
  ];
  
  module.exports = { data: sampleListings };