import { useEffect } from "react";

const DefaultPage = () => {
  useEffect(() => {
    function startTime() {
      const today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();
      m = checkTime(m);
      s = checkTime(s);
      const txtElement = document.getElementById("txt");
      if (txtElement) {
        txtElement.innerHTML = h + ":" + m + ":" + s;
      }
      setTimeout(startTime, 1000);
    }

    function checkTime(i: any) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    startTime();
  }, []);

  return (
    <>
      <div className="top-part dark:bg-[#222638] bg-[#F3F4F7] p-[30px] rounded-[24px] h-[65vh]">
        <div className="flex justify-between items-center">
          <div
            id="txt"
            style={{
              fontSize: "3rem",
              color: "#000",
              fontWeight: 700,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default DefaultPage;
