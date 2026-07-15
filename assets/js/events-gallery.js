(() => {
  const cdn = "https://images.squarespace-cdn.com/content/v1/62421eb89b3fae754ee94567/";
  const photos = [
    "58940384-2c97-4270-8832-90c3197cd9ae/MORANSHA-5.jpg",
    "bf113b5d-2c22-43bd-a219-d273667a2eb6/MORANSHA-8.jpg",
    "5022f7c7-e23a-4568-80a3-b061c0e754cc/MORANSHA-44.jpg",
    "8fc9751c-1245-4cca-a0eb-2aa63b37b6f0/MORANSHA-48.jpg",
    "e15bb15c-33ef-4fc2-bcbf-bcfa49066d54/MORANSHA-181.jpg",
    "4aaa077d-6b57-4147-a4f0-ec4e690d73fd/MORANSHA-12.jpg",
    "0c60939e-0e8c-4b02-b1c7-7271f8030d22/MORANSHA-113.jpg",
    "31cf2c92-07cf-41c2-bac3-f13bfa54697b/MORANSHA-92.jpg",
    "14d5a3bf-faa2-4f43-b472-8754b20de43e/MORANSHA-39.jpg",
    "b475fd3e-ab85-4f5d-aa3a-ab477ab61773/MORANSHA-27.jpg",
    "bc19c60b-d134-45fa-97ca-2071c029f9d5/MORANSHA-41.jpg",
    "12808c8b-a942-41f1-9a0c-708fc076508e/MORANSHA-34.jpg",
    "b04f9720-112b-4266-a41d-6895274e3768/MORANSHA-57.jpg",
    "0843432f-5b6e-4786-92d7-dd076d01387d/MORANSHA-85.jpg",
    "870b0453-8059-4ffe-819e-c937053b0570/MORANSHA-87.jpg",
    "c0feee7e-a2e3-42fb-924e-f5afc3ce0cc7/MORANSHA-121.jpg",
    "b11a2429-4e98-47e2-9efd-64dd0dc877b8/MORANSHA-122.jpg",
    "ba204f7b-048a-40fe-89a6-ce44fd750cb6/MORANSHA-132.jpg",
    "d945f3df-74b3-4c8c-9e26-3974d1546314/MORANSHA-137.jpg",
    "3b283713-d7c6-44f0-8200-397ad0b289e1/MORANSHA-151.jpg",
    "4435b975-f0c2-4143-bc9f-63641775ead3/MORANSHA-1.jpg",
    "25e612d6-c196-4de4-b639-9be731cfbc04/MORANSHA-61.jpg",
    "004dede6-b7f4-4f5a-9972-0e9465afdf71/MORANSHA-3.jpg",
    "dbd4ccb3-86c8-40ce-9824-e46d65b56405/MORANSHA-75.jpg",
    "29c866e5-2511-4173-8280-a060b73240e0/MORANSHA-6.jpg",
    "aeb65702-9a20-4a35-b335-c40e88fdf1d4/MORANSHA-19.jpg",
    "23aa3016-69d7-4606-a10c-2f9e267c0ceb/MORANSHA-10.jpg",
    "fb104cf7-b444-4b74-bc5a-c8fcefafb494/MORANSHA-58.jpg",
    "1663017329329-BFPTACIN41GNUX1OPZUQ/MOR02352.jpg",
    "8eff883d-207f-42a0-a3c0-238e908aa19c/MOR02618.jpg",
    "347cbaaa-c55f-407f-8f5d-9db26e2d5b98/MOR02818.jpg",
    "5281a2c1-9bcc-4a84-a5d4-948184df5316/MOR02536.jpg",
    "598c8679-2bb5-49bf-aea2-9110ef947816/MOR02486.jpg",
    "164f8c81-2717-4e8f-ba16-a67ea67a62bc/MOR02449.jpg",
    "1a3048ee-2923-40cc-8f21-e21423847973/MOR02389.jpg",
    "d361f124-04a3-4e4a-b61f-d6a02314f669/MOR02355.jpg",
    "8ca6361f-4685-4fab-a824-17f67f4a1dc9/MOR05509.jpg",
    "76ce0e2f-1547-4464-b163-1baa1b183efd/MOR05342.jpg",
    "b0915a8f-bbe9-476e-973d-aacdb7775b5f/MOR05486.jpg",
    "12e10f80-5286-430d-bfff-93ea7a302c5c/MOR05358.jpg",
    "c3132717-abba-4c01-a17f-bdb2078c8e5f/S0E3A9240.jpg",
    "3b639579-9e80-479c-8f27-2c3fd2ab4523/MOR04649.jpg",
    "d9cc1716-13ec-4172-8c02-44190fdbad60/MOR05523.jpg",
    "bbaf6ecc-1572-416a-9c7b-81d6ef8799ba/MOR05353.jpg",
    "35741938-18a7-42b7-837d-e05995dff723/MOR05364.jpg",
    "fa62961d-827c-41a1-bce8-a8db82035ae8/MOR04651.jpg",
    "88e0705b-b6ff-4812-9521-e6f7666c8742/S0E3A9247.jpg",
    "d86a60b5-362a-4085-b527-bccc3b3430a5/MOR04663.jpg",
    "dcf73aa2-3b74-4d60-9ae3-712a53186bc2/MOR04670.jpg",
    "902e841b-c815-44ea-936e-6d567db9bf6c/MOR04647.jpg",
    "2daf8bee-4110-411d-82de-813f4ba6a16d/MOR04646.jpg",
    "34790fa2-20e1-4170-86d5-7cb8497a473d/S0E3A9224.jpg",
    "8bce4f48-bb07-42fc-9cf3-597f95f8861a/MOR04650.jpg",
    "506ba0db-f7ac-4b0d-b6a7-7dfa92b6008b/MOR04645.jpg",
    "7c6bbfc2-ba57-42ad-9ee0-38058062293b/MOR05474.jpg",
    "0e7cc525-2e7b-480e-965f-69253b722f1b/MOR04637.jpg",
    "4948994e-bf86-4cc3-83ae-0f8c85eb5b97/MORAN-385.jpg",
    "7d13c744-2729-4000-9e19-c3f26a7dcd37/MORAN-500.jpg",
    "0d3d1cbe-18a6-48e8-83d8-74cdfa19e3e5/MORAN-506.jpg",
    "aa3c2749-131a-44f6-bbfb-e5c4e2430e67/MORAN-310.jpg",
    "051d3072-acf1-4865-8914-eb79c3c08ced/MORAN-355.jpg",
    "a0656fc3-33d8-404a-925c-ff139427d5b4/MORAN-302.jpg",
    "81131fa3-7582-4e52-884a-2efac6ab61a7/MORAN-161.jpg",
    "af877413-d990-4e4a-8453-08d8a2180f93/MORAN-281.jpg",
    "c02d89ce-4c10-4cab-98a5-73496758a8f8/MORAN-240.jpg",
    "7fdeb8b2-31a4-401e-a677-c78747b78e9b/MORAN-343.jpg",
    "c6c1f051-85f3-4c80-9646-244e2ddc0d22/MORAN-1.jpg",
    "0f45ef91-edcf-4863-a101-55a77bb339d9/MORAN-226.jpg",
    "e8ea7781-707c-4615-9a6f-c8c861767116/MORAN-126.jpg",
    "90922c81-9ad4-4e03-9311-b14bc511d496/MORAN-29.jpg",
    "56a2112b-fdd8-44d2-a85e-5e9c17e9dddc/MORAN-105.jpg",
    "790d9485-bb7e-4cf8-bcf5-afd9433012d8/MORAN-65.jpg",
    "50ac35b3-8658-4586-abea-2d3aeb4f28d9/Moransha-2.jpg",
    "c1622577-eb1a-4985-a317-b5c3355eb7bf/Moransha-3.jpg",
    "7a04429b-936d-4092-9419-fc81b4ae7a9f/Moransha-6.jpg",
    "a3b5924a-0fa5-40ad-99e8-8c00ebf2cd84/Moransha.jpg",
    "1d4b13e5-051c-44a9-94c1-3f6495327ece/Screenshot+2026-05-07+at+11.13.18%E2%80%AFAM.png",
    "970a71bf-f8c5-41ae-b8c5-d66a3d7343d5/Screenshot+2026-05-07+at+11.13.31%E2%80%AFAM.png",
  ];

  const gallery = document.querySelector("[data-archive-gallery='events']");

  if (!gallery) return;

  const fragment = document.createDocumentFragment();

  photos.forEach((path, index) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");

    figure.className = "archive-gallery-item";
    image.src = `${cdn}${path}?format=1000w`;
    image.alt = `MoranSha event photography ${index + 1}`;
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
