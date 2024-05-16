import { Link } from "react-router-dom";
import Heading from "../components/shared/Heading";
import testImage from "../assets/test app.svg";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { userContext } from "@/context/UserContext";

const Home = () => {
  const { userToken } = useContext(userContext);
  return (
    <>
      <Heading>الصفحة الرئيسية</Heading>
      <div className="p-10 flex  justify-between items-center max-lg:flex-col-reverse gap-5 bg-secondary rounded">
        <div className="flex flex-col items-center gap-3">
          <p className="text-center leading-10 text-3xl">
            النسخة التجريبية للبرنامج
          </p>
          <Link to={userToken ? "/products" : "/login"}>
            <Button className="w-fit">بدء الاستخدام</Button>
          </Link>
        </div>
        <img
          src={testImage}
          className="w-60 h-60"
          width={260}
          height={260}
          alt="Test Image"
        />
      </div>
    </>
  );
};

export default Home;
