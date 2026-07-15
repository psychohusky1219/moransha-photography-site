(() => {
  const cdn = "https://images.squarespace-cdn.com/content/v1/62421eb89b3fae754ee94567/";
  const photos = [
    "3cc88788-2eeb-438b-803c-e71cd878cc8f/Moransha-99.jpg",
    "d1d74a16-4feb-4a81-a992-4f46baaa930a/Moransha-75.jpg",
    "231aa6fb-088d-43f1-97b7-67ef4181e21e/Moransha-87.jpg",
    "74311fb7-7004-4214-bb35-495fb6118083/Moransha-94.jpg",
    "81595877-8d1e-46c4-a2c6-dff8f32d2ae9/Moransha-55.jpg",
    "e3fd0e8d-d1da-4ed4-a731-fbf1e827454b/Moransha-69.jpg",
    "9cef2075-36b6-43cc-8106-12c12004222e/Moransha-17.jpg",
    "4242c9cd-691a-491c-b8e3-04a77625535a/Moransha-46.jpg",
    "aef267bc-13f2-466e-90b8-41b1bc2ef9de/Moransha-106.jpg",
    "f9ade881-070c-462c-b4b6-696aab70cb2f/Moransha-12.jpg",
    "371ad8cc-7af7-4174-a213-29bbe7970bb2/Moransha-81.jpg",
    "bfc02fab-7adc-4855-8cd7-d7fb76d450b0/Moransha-124.jpg",
    "79a16b3b-e57f-471e-bc91-dbb6597e1fd5/MORANSHA-79.jpg",
    "40a70599-ea33-43ec-a500-8c401956bfab/MORANSHA-104.jpg",
    "6cb9f466-847a-4ea0-bf26-9ed0b0a16add/MORANSHA-7.jpg",
    "f7ae6ce6-b10d-4b5a-a7e4-06538b2bb9b5/MORANSHA-44.jpg",
    "4570e2e3-f0bd-4e63-8267-edaedff41680/MORANSHA-15.jpg",
    "7b4aa9a8-1e83-4fea-b6f8-b2b2c5ac9ba2/MORANSHA-29.jpg",
    "8365f61b-cf82-4692-ba11-4b54191b4e8f/MORANSHA-112.jpg",
    "a3aaa01f-ef18-480f-bd3d-8b49ed770e4a/MORANSHA-94.jpg",
    "2dfb15cc-eaa2-4123-af64-a25ae2121ae6/MORANSHA-100.jpg",
    "5434ccd6-09ab-4c3b-9e9a-73066e985ab4/MORANSHA-119.jpg",
    "9beb0e8c-5e98-408c-bee1-b3f446ab4adb/MORANSHA-67.jpg",
    "732309a2-8e20-493b-af2a-19ee4c5b70d6/MORANSHA-86.jpg",
    "6931f03c-c2eb-4b50-ab8e-0d0c1a109353/MORANSHA-98.jpg",
    "e82cd8b7-bf2f-4eb7-98e8-fa57a1a10d83/MORANSHA-119.jpg",
    "f5b75303-d0f4-4e4b-85d8-20efafc758ba/MORANSHA-128.jpg",
    "3539c898-c68c-44ae-a5ed-30e0f0c040c9/MORANSHA-143.jpg",
    "26d9a6cd-eb44-4745-bc9c-2ee4feaf5796/Moransha-12.jpg",
    "923b3383-8a36-48f2-be00-909fe317d0f7/Moransha-63.jpg",
    "e459fefc-95d8-4b4a-a037-3a2ecec20a33/Moransha-1.jpg",
    "5c34be9f-29d7-4f84-8f6f-95b4d4691bfb/Moransha-19.jpg",
    "260c0418-99e4-4731-9f05-a19d21203716/Moransha-4.jpg",
    "9b1dd046-bcfb-42f8-b9bf-c3cd1043e2f7/Moransha-58.jpg",
    "468184e1-25e0-4cb9-b49f-2130d6377469/Moransha-102.jpg",
    "b1065d97-76cd-4005-b39f-2c3dccae7a3f/Moransha-32.jpg",
    "d7b0e2ce-036c-482b-848f-34d897bc9e3e/Moransha-38.jpg",
    "f7046fcc-8e56-48e0-8da7-4c0bc3a18ffd/Moransha-26.jpg",
    "eac89487-feb0-470f-a4eb-c07fda7155bd/Moransha-43.jpg",
    "f746105d-79b3-4e9e-811c-e6fbaf441ea4/Moransha-72.jpg",
    "b981b6d0-77be-45ba-b092-464207961af9/Moransha-130.jpg",
    "1851195c-9c0c-4d1f-86ce-a9b803e4da5c/Moransha-91.jpg",
    "80bf2f0d-762b-4393-87d1-05404d5becdb/Moransha-117.jpg",
    "8470c346-c0cf-4fac-9906-db4b69a696e6/Moransha-84.jpg",
    "a314935c-ab62-471b-8680-b9997a8215d6/Moransha-94.jpg",
    "15518fa4-707c-4da1-a4a3-2c90783e080a/Moransha-10.jpg",
    "182661f5-f0bb-49b7-b835-cb45470a757f/Moransha-19.jpg",
    "da6fecd0-dbfc-4320-90ff-8de424652f2e/Moransha-35.jpg",
    "4eedcfc6-92d2-4d9b-b85c-0ecda8215762/Moransha-50.jpg",
    "11309053-820e-464c-b384-74ca19185647/Moransha-52.jpg",
    "93f9fcb8-57f0-4485-a550-b27ac13d2ee4/Moransha-108.jpg",
    "3ee707a2-5d3b-4ef5-babb-e2aef8e93cc5/Moransha-193.jpg",
    "2515597c-5038-42f0-a4c3-3b7ead46c11b/Moransha-113.jpg",
    "81106a78-9072-41e7-aedd-e29c8f02d171/Moransha-143.jpg",
    "f269509c-ee62-4506-90e4-878d59508461/Moransha-223.jpg",
    "e6dc2033-8f94-41d8-be93-6c882de0b053/Moransha-251.jpg",
    "8dd8db84-9d38-439f-8f5e-af4b73e527bf/MOR03290.jpg",
    "11ee1402-eeef-429d-86b4-d2e246786a17/MOR03432.jpg",
    "90327366-59f6-4ca8-a863-1ba54054fbcf/MOR03371.jpg",
    "f846a828-9b94-47f6-b760-5eac9d082c6b/MOR03682.jpg",
    "c2b60887-dd79-446b-af2a-6698d2a36ac3/MOR03611.jpg",
    "fadae9d2-7b23-4ace-9abf-3ac23f1fbd12/MOR03355.jpg",
    "df31af98-3b64-46ad-8d1c-e0be1c6c36c5/MOR03443.jpg",
    "83318c33-955f-493c-8dfe-fee0851df223/MOR03480.jpg",
    "0041cd03-fe7e-414b-a8ac-c68ee1d08a17/MOR03521.jpg",
    "c1798a8d-cede-4020-9967-459edc813307/MOR03672.jpg",
    "3ddd36eb-8ed5-4aa9-813a-4e50846ae8d2/MOR03775.jpg",
    "9cc763b9-eb8d-422c-a06c-b63a63881d80/MOR03805.jpg",
  ];

  const gallery = document.querySelector("[data-archive-gallery='new-york']");

  if (!gallery) return;

  const fragment = document.createDocumentFragment();

  photos.forEach((path, index) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");

    figure.className = "archive-gallery-item";
    image.src = `${cdn}${path}?format=1000w`;
    image.alt = `MoranSha New York photography ${index + 1}`;
    image.loading = index < 8 ? "eager" : "lazy";
    image.decoding = "async";
    image.addEventListener("load", () => image.classList.add("is-ready"), { once: true });

    if (image.complete) {
      image.classList.add("is-ready");
    }

    figure.append(image);
    fragment.append(figure);
  });

  gallery.append(fragment);
})();
