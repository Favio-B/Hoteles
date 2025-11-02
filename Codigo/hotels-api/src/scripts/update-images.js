require('dotenv').config();
const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hotels_bogota';

const sets = [
  {
    match: /estelar\s+la\s+fontana/i,
    name: 'ESTELAR La Fontana Hotel',
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipPavG9kzJRRBrpb0E9J9QRXeHpBsAST3tsDdlO0=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/proxy/G1n9ShqL5V1roqlM5aO3xh83EaKp7lYPrbyKa3wueFVkqbvt6dabIluFSaxLmLPwE_fPpsLNXd9GHBvFD0Pl-KvmBA-ptLb4_WHbI-nZMyDHmH3iuTGwHarPGIN0k4dmV88Dt6Gd9-92xmfhZnX2tJ8gkD5shw=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSx-cRiJGtyoFaA5enmRC-O_Z_ttygPib1dOzOfuFUxeeq5U-7Xiu0EL1pmzZUhJaD5A_ejUEcIFi0SzFuTpRDbBz_GfzR1yXq3ScW7xNTHxM73dByV4CGq6IC4V1GtTRb3gTXq2=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/proxy/sDsaLeDDcbp-WWKNQIRYcVJ7ZUSPf0Pa4TftDuQZVVVxen7URq3Nw-Cb9EzmBlvXMmseI7EecPgNRC5b4fZ_4jBxM6_1uir0WeWzjvdEZTiO_JmP2icgXAlky-UIOFK2NlUZ5IW02CMA8tzifEBxuIU5WEvhiw=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/proxy/9PnVYio8DEjxf7eRL8FenYRdKlArwGht5vqJLPBA_oTRbWNzzlqVmOJJWedpx070OPdrZh8EdRlw1-9GPezkQ5vvBiu5cw-CChhuKJOA6BAhjoSh7YUDceSfdh_veZEVyfcBs8rC-tPM89XB7SMAvrLUicOK6rY=s1360-w1360-h1020-rw',
    ],
  },
  {
    match: /w\s+bogot/i,
    name: 'W Bogota',
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipNGfq7rc34dyt78mfl7oie4qm3jjrY7eELn4G_r=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/p/AF1QipOJ6KUaPleq8LWXZLyExCNU_3fzguxPrzkap_W_=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/proxy/EhowoBT-RyPLtF5H3lz__we4iaG8UKvYcMKYogGsj2vdr1KPqC3QFskW6FB3VTAAx37y9IgVmcyMaD50HujNGsggF9TO0GeB2oogAC3Vu19xJYm_WSazYHyCRQznIYH0VMU0r-CIprGUREAcT0QHf4n3PEncWg=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/proxy/0HsLvfIzYV-UEtD2EXsNO1J-b4tah5O8BumkO3R97s_yu8DVyriXs5FiuN0JJ9hjNrS6rPpTYNOSxo7jxzOrWgn82lBCzkJGItGNwwgD5GGrbw7D7eOel2rXTtTS3o-RHpo1o1DKWUB4dxZzJWgE7e2akzjdmg=s1360-w1360-h1020-rw',
    ],
  },
  {
    match: /tequendama/i,
    name: 'Hotel Tequendama',
    images: [
      'https://www.hotelestequendama.com.co/assets/cache/uploads/1920x1080/portada-1729529261.jpg',
      'https://z.cdrst.com/foto/hotel-sf/12241707/granderesp/foto-hotel-12240c5d.jpg',
    ],
  },
  {
    match: /de la *[óo]pera/i,
    name: 'Hotel de la Ópera',
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipOKZdXjRDO8rTQqWw19rq3vBafkgNm1WJhHD6pi=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/p/AF1QipOb_r8JGgdqCB7uJ7_UrQjAnmU4NjvkpZE_7K-i=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/p/AF1QipN7tofzL_2MdfWmnavdjcOlrby6O5tfIvQXnpD-=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/p/AF1QipPeUYtD6ylB3wsMf4vXFY5iLia3B86jnQ86x83i=s1360-w1360-h1020-rw',
    ],
  },
  {
    match: /embassy\s+suites/i,
    name: 'Embassy Suites by Hilton Bogotá - Rosales',
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipNfpbEmHeapKDHzroJaxbNAOPNbSX3yLq9AGUN0=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/p/AF1QipM9XXpeK7-FLi-ztjw69aZi6OR_jhys1HP-K2E7=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/p/AF1QipM0Xe9kIjDVq-1w8HPoJUhSqAvtLIh_qDYOnXUr=s1360-w1360-h1020-rw',
    ],
  },
  {
    match: /bogot[aá]\s*plaza/i,
    name: 'Bogotá Plaza Hotel',
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipNwSiRBHDy6VB41D35hIzi3HSbWR51Dxu3oN-Q1=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/p/AF1QipMf2Iu-WqWCMxg9iHyQzGiN-I_StHx4IblehzwW=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/p/AF1QipPwbC6S3S12ecU6J81tfS3V8yI7G2wl2cAgoq50=s1360-w1360-h1020-rw',
    ],
  },
  {
    match: /ibis.*bogot[aá].*museo/i,
    name: 'Hotel Ibis Bogotá Museo',
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipOaTpz1RdTRT_C70HOePZgwdbJZhsngCLVb-q2r=w574-h384-n-k-rw-no-v1',
      'https://lh3.googleusercontent.com/p/AF1QipOeE7dxPJ5DQoutaVQD1ubBhNB568rvl1S-j_DX=w574-h384-n-k-rw-no-v1',
      'https://lh3.googleusercontent.com/p/AF1QipPmntGhJVdKfG3ThUgjfDnEVeqAK4GBti67jA7u=w574-h384-n-k-rw-no-v1',
    ],
  },
  {
    match: /casa\s*deco/i,
    name: 'Hotel Casa Deco',
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipOLIqGL51eMOjyyuSWXx7IhKMZLDtduOWMudLOs=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/p/AF1QipPjQ_ziXRkCUAio6-gGLrGKvhV-opXSLEG7HnJW=s1360-w1360-h1020-rw',
    ],
  },
  {
    match: /avani.*zona\s*t/i,
    name: 'Hotel Avani Royal Zona T Bogotá',
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipP_B3o5iPyZiOA3nZAYHLO9h4xIOOoqjo3DCWIV=s1360-w1360-h1020-rw',
      'https://lh3.googleusercontent.com/proxy/C-fEm1NBmdSkZ9hVD8YnnUwS0Eeb4NuWIZdwNoMe0g3fyMNk5ZKWgLAFd3XRduqvUdzJNcrIDC6y6T-frnaGCJgtkK6xp99VPLCVzZVOW74H8ipNbl0VNuULuzLVbgft2qcV9g9Cu3tw0OHDbDngzicf3SW4yA=s1360-w1360-h1020-rw',
    ],
  },
  {
    match: /buenavista|bellavista/i,
    name: 'Casa Hostal Buenavista',
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipO3eCzSetWdyekdJFfxJF05ywIhdJU_CuycVoH9=w574-h384-n-k-rw-no-v1',
      'https://lh3.googleusercontent.com/p/AF1QipPABJ0RUwMHQIhp0i_vYeUw7sTdue4XF4cDZjFm=w252-h336-k-no',
      'https://lh3.googleusercontent.com/p/AF1QipMDVwnBucx-17JwWodOfo62qac5H_JQ3rlMe-Ww=w253-h189-k-no',
    ],
  },
];

async function run() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  let updated = 0;
  for (const s of sets) {
    const hotel = await Hotel.findOne({ name: { $regex: s.match } });
    if (!hotel) continue;
    hotel.name = s.name; // normalizar nombre
    hotel.images = (s.images || []).map((u) => ({ url: u, alt: hotel.name }));
    await hotel.save();
    updated++;
    console.log(`Actualizado: ${hotel.name} (${hotel._id}) con ${hotel.images.length} imágenes`);
  }
  await mongoose.disconnect();
  console.log(`Hecho. Hoteles actualizados: ${updated}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

