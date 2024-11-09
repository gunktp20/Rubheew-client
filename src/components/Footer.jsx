function Footer({position}) {
    return (
      <div className={`bottom-[0px] ${position ? position : "absolute" } bg-[#f54749] mt-[8rem] z-[11] w-[100%] flex flex-col justify-center items-center pt-10 pb-10`}>
        <div className="mb-4 flex w-[70%] justify-between sm:flex-col sm: sm:items-center">
          <div className="flex flex-col w-[200px] sm:w-[300px] sm:mb-5">
            <div className=" text-[14.5px] text-white mb-5 font-bold">Rubheew</div>
            <div className="text-[12.5px] text-[#fff]">
            มหาวิทยาลัยราชภัฏนครปฐม 85 ถ.มาลัยมาน อ.เมือง จ.นครปฐม 73000 0 3426 1048 0 3410 9300. saraban@npru.ac.th
            </div>
          </div>
          <div className="flex flex-col w-[200px] sm:w-[300px] sm:mb-5">
            <div className=" text-[14.5px] text-white mb-5 font-bold">บริการ</div>
            <div className="text-[12.5px] mb-3 text-[#fff] w-[200px]">
              การออกแบบ เว็ปไซต์
            </div>
            <div className="text-[12.5px] mb-3 text-[#fff] w-[200px]">
              การพัฒนา เว็ปไซต์
            </div>
          </div>
          <div className="flex flex-col w-[200px] sm:w-[300px]">
            <div className=" text-[14.5px] text-white mb-5 font-bold">
              ภาษา
            </div>
            <div className="text-[12.5px] mb-3 text-[#fff] w-[200px]">
              ไทย
            </div>
          </div>
        </div>
  
        <div className="bg-white w-[90%] h-[1px]"></div>
        <div className="flex w-[70%] justify-center text-[#ccc] text-[12px] mt-2">
          Non Copyrighted © 2022 Design and upload by rich technologies
        </div>
      </div>
    );
  }
  
  export default Footer;
  