export function LiveDetail() {
  return (
    <div className="border flex flex-col gap-y-2 py-3 px-2 rounded-md h-[30em]">
      <div className="text-center text-2xl my-2">LOT 301</div>
      <div className="w-full mb-2 flexcenter">
        <img
          loading="lazy"
          className="w-52"
          src="https://4kwallpapers.com/images/wallpapers/bmw-z4-ac-schnitzer-acs4-4-0i-2021-5k-8k-1280x1280-4780.jpg"
          alt=""
        />
      </div>
      <div>
        <span className="text-primary">REGISTRATION NO:</span> VGP3458534
      </div>
      <div>
        <span className="text-primary">YEAR:</span>:2021
      </div>
      <div>
        <span className="text-primary">RESERVED PRICE:</span> RM44,000
      </div>
      <div>
        <span className="text-primary">TRANSMISSION TYPE:</span> Auto
      </div>
      <div>
        <span className="text-primary">LEGAL OWNER:</span> Maybank Berhad
      </div>
    </div>
  );
}
