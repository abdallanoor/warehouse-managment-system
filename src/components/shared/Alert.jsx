import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Alert = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track dialog open/close

  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform your logout action here
    // For example: logoutUser();
    localStorage.removeItem("token");

    setIsOpen(false); // Close the dialog after performing the action
  };

  const handleLogin = () => {
    // Perform your logout action here
    // For example: logoutUser();
    localStorage.setItem("token", "111");

    setIsOpen(false); // Close the dialog after performing the action
  };

  const token = localStorage.getItem("token");

  return (
    <>
      {token ? (
        <AlertDialog open={isOpen}>
          <AlertDialogTrigger
            onClick={() => setIsOpen(true)}
            className="flex items-center p-2 hover:bg-secondary transition-colors rounded gap-2"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
              <AlertDialogDescription>
                سيتم تسجيل خروجك من البرنامج.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsOpen(false)}>
                الغي
              </AlertDialogCancel>
              <Button onClick={handleLogout}>تسجيل الخروج</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <AlertDialog open={isOpen}>
          <AlertDialogTrigger
            onClick={() => setIsOpen(true)}
            className="flex items-center p-2 hover:bg-secondary transition-colors rounded gap-2"
          >
            <LogIn className="w-5 h-5" />
            تسجيل الدخول
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="flex flex-col gap-8">
              <AlertDialogHeader>
                <AlertDialogTitle>تسجيل الدخول</AlertDialogTitle>
                <AlertDialogDescription>
                  الرجاء إدخال اسم المستخدم و كلمة المرور.
                </AlertDialogDescription>
              </AlertDialogHeader>
              {/* <h2 className="text-2xl text-center">تسجيل الدخول</h2> */}
              <div className=" flex flex-col gap-5">
                <Input type="email" placeholder="اسم المستخدم" />
                <Input type="password" placeholder="كلمة المرور" />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsOpen(false)}>
                  الغي
                </AlertDialogCancel>
                <Button onClick={handleLogin}>تسجيل الدخول</Button>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default Alert;
