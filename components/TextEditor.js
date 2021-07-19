import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw } from "draft-js";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { db } from "../firebase";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

/*import { Editor } from "react-draft-wysiwyg";
  Fix the bug with windows bacause the page is using javascript but the server is nodejs*/
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);

function TextEditor() {
  const [session] = useSession();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const router = useRouter();
  const { id } = router.query;

  const [snapshot] = useDocumentOnce(
    db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
  );
  
  // When the page is loading, only run this code once
  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(EditorState.createWithContent(
        convertFromRaw(snapshot?.data()?.editorState)
      ))
    }
  }, [snapshot])

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    db.collection("userDocs")
      .doc(session.user.email)
      .collection("docs")
      .doc(id)
      .set(
        {
          editorState: convertToRaw(editorState.getCurrentContent()),
        },
        {
          merge: true,
        }
      );
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 p-10 bg-white shadow-lg max-w-6xl mx-auto mb-12 border"
      />
    </div>
  );
}

export default TextEditor;
