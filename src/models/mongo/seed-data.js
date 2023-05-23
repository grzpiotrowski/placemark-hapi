export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret",
        scope: ["user", "admin"]
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret",
        scope: ["user"]
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "secret",
        scope: ["user"]
      }
    },
    categories: {
      _model: "Category",
      lake: {
        name: "Lake"
      },
      mountain: {
        name: "Mountain"
      },
      hill: {
        name: "Hill"
      },
      waterfall: {
        name: "Waterfall"
      },
      cliff: {
        name: "Cliff"
      },
      other: {
        name: "Other"
      }
    },
    pois: {
      _model : "Poi",
      poi_1 : {
        name: "Lugnaquilla",
        description: "Lugnaquilla, at 925 metres, is the highest Irish mountain outside of Kerry.",
        latitude: 52.96714,
        longitude: -6.464618,
        userid: "->users.homer",
        category: "->categories.mountain"
      },
      poi_2 : {
        name: "Tonelagee",
        description: "At 817 metres, Tonelagee is the third highest in the Wicklow mountains. It's name means 'backside to the wind'",
        img: "https://res.cloudinary.com/dnash1lje/image/upload/v1684786858/qauwc8pttvxd6fqrxpx5.jpg",
        latitude: 53.053606,
        longitude: -6.382171,
        userid: "->users.homer",
        category: "->categories.mountain"
      },
      poi_3 : {
        name: "Carrauntoohil",
        description: "Carrauntoohil is the highest mountain in Ireland at 1,038.6 metres",
        latitude: 51.999445,
        longitude: -9.742693,
        userid: "->users.homer",
        category: "->categories.mountain"
      },
      poi_4 : {
        name: "Errigal",
        description: "Errigal is a 751-metre mountain near Gweedore in County Donegal",
        latitude: 55.033,
        longitude: -8.112,
        userid: "->users.marge",
        category: "->categories.mountain"
      },
      poi_5 : {
        name: "Lough Ouler",
        description: "Just next to the Tonelagee summit is the deep 'heart-shaped' corrie lake of Lough Ouler. A great hiking destination.",
        latitude: 53.06028,
        longitude: -6.37331,
        userid: "->users.marge",
        category: "->categories.lake"
      },
      poi_6 : {
        name: "Torc Waterfall",
        description: "Easach Toirc, meaning 'cascade of the wild boar', is a 20 metres (66 ft) high, 110 metres (360 ft) long cascade waterfall formed by the Owengarriff River as it drains from the Devil's Punchbowl corrie lake at Mangerton Mountain.",
        latitude: 52.00229,
        longitude: -9.50635,
        userid: "->users.homer",
        category: "->categories.waterfall"
      },
      poi_7 : {
        name: "Cliffs of Moher",
        description: "The Cliffs of Moher (Irish: Aillte an Mhothair) are sea cliffs located at the southwestern edge of the Burren region in County Clare, Ireland. They run for about 14 kilometres (9 miles).",
        latitude: 52.97153,
        longitude: -9.4307,
        userid: "->users.homer",
        category: "->categories.cliff"
      },
    }
  };
  