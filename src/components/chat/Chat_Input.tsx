import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import InputEmoji from "react-input-emoji";
import { ImAttachment } from "react-icons/im";
import { FiImage } from "react-icons/fi";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useChatContext } from "@/context/ChatContext";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import { useUtilsContext } from "@/context/UtilsContext";
import { DBUser } from "@/utils/lib";

interface ChatInputProps {
  user: any;
  dbUser: DBUser;
}

function Chat_Input({ user, dbUser }: ChatInputProps) {
  const [text, setText] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const { state, fileName, setFileName } = useChatContext();
  const { setInputDivStyle } = useUtilsContext();

  const handleSendText = async () => {
    if (state.chatId) {
      try {
        if (img) {
          const blob = await fetch(img).then((response) => response.blob());
          const storageRef = ref(storage, uuidv4());

          const uploadTask = uploadBytesResumable(storageRef, blob);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // const progress =
              //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // console.log("Upload is " + progress + "% done");
              // switch (snapshot.state) {
              //   case "paused":
              //     console.log("Upload is paused");
              //     break;
              //   case "running":
              //     console.log("Upload is running");
              //     break;
              // }
            },
            (error) => {
              console.error(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  state.chatId &&
                    (await updateDoc(doc(db, "chats", state.chatId), {
                      messages: arrayUnion({
                        id: uuidv4(),
                        text,
                        senderId: user.id,
                        date: Timestamp.now(),
                        img: downloadURL,
                      }),
                    }));
                }
              );
            }
          );
        } else if (file) {
          const storageRef = ref(storage, uuidv4());

          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // const progress =
              //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // console.log("Upload is " + progress + "% done");
              // switch (snapshot.state) {
              //   case "paused":
              //     console.log("Upload is paused");
              //     break;
              //   case "running":
              //     console.log("Upload is running");
              //     break;
              // }
            },
            (error) => {
              console.error(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  state.chatId &&
                    (await updateDoc(doc(db, "chats", state.chatId), {
                      messages: arrayUnion({
                        id: uuidv4(),
                        text,
                        senderId: user.id,
                        date: Timestamp.now(),
                        file: downloadURL,
                        fileName,
                      }),
                    }));
                }
              );
            }
          );
        } else {
          await updateDoc(doc(db, "chats", state.chatId), {
            messages: arrayUnion({
              id: uuidv4(),
              text,
              senderId: user.id,
              date: Timestamp.now(),
            }),
          });
        }

        user &&
          (await updateDoc(doc(db, "conversations", user.id), {
            [state.chatId + ".lastMessage"]: {
              text,
            },
            [state.chatId + ".date"]: serverTimestamp(),
          }));
        await updateDoc(doc(db, "conversations", state.user.userId), {
          [state.chatId + ".lastMessage"]: {
            text,
          },
          [state.chatId + ".date"]: serverTimestamp(),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setText("");
        setImg(null);
        setFile(null);
        setFileName(null);
      }
    }
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        // Check if the selected file is an image
        if (selectedFile.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            setImg(result);
          };
          reader.readAsDataURL(selectedFile);
          setFile(null);
          setFileName(selectedFile.name);
        } else {
          console.log("Selected file is not an image.");
        }
      }
    }
  };

  const handleDocumentFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const allowedExtensions = [
          ".doc",
          ".docx",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ".pdf",
          "application/pdf",
        ];
        if (
          allowedExtensions.includes(selectedFile.type) ||
          allowedExtensions.includes(selectedFile.name.toLowerCase())
        ) {
          setFile(selectedFile);
          setImg(null);
          setFileName(selectedFile.name);
        } else {
          console.log("Selected file is not a valid document.");
        }
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendText();
    }
  };

  useEffect(() => {
    const updateDivProperties = () => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();

        setInputDivStyle(rect.height);
      }
    };

    updateDivProperties();
  }, [setInputDivStyle, text]);

  return (
    <div ref={divRef} className="py-1 flex items-center sm:px-4 px-2 bg-b/25">
      <div className="flex w-16 items-center justify-between relative">
        <label
          htmlFor="imageFile"
          className="hover:bg-c cursor-pointer h-8 w-8 flex items-center justify-center rounded-lg"
        >
          <input
            type="file"
            id="imageFile"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageFile}
          />
          <FiImage />
        </label>
        <label
          htmlFor="documentFile"
          className="hover:bg-c cursor-pointer h-8 w-8 flex items-center justify-center rounded-lg"
        >
          <input
            type="file"
            id="documentFile"
            accept=".doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf, application/pdf"
            style={{ display: "none" }}
            onChange={handleDocumentFile}
          />

          <ImAttachment />
        </label>

        {fileName && (
          <div className="absolute top-[-100px] bg-white shadow-xl p-3 rounded-lg max-w-[300px]">
            <div className="flex items-center gap-4 w-full">
              <p
                className="w-full"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {fileName}
              </p>
              <span
                className="font-bold text-red-600 rounded-full cursor-pointer shadow-xl"
                onClick={() => setFileName(null)}
              >
                ✖
              </span>
            </div>
          </div>
        )}
      </div>
      <InputEmoji
        placeholder="Write a message"
        value={text}
        onChange={setText}
        cleanOnEnter
        onKeyDown={handleKeyPress}
        fontFamily="inherit"
      />
      <div>
        <div
          className="cursor-pointer bg-primary h-8 w-8 rounded-full flex items-center justify-center"
          onClick={handleSendText}
        >
          <IoIosSend className="text-white" />
        </div>
      </div>
    </div>
  );
}

export default Chat_Input;
