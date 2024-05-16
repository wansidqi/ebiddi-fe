import { useStoreContext } from "@/Context";
import { useAPIServices } from "@/services";
import "@/term.css";
import { useNavigate } from "react-router-dom";

export function Term() {
  const navigate = useNavigate();
  const { term, setTerm, USER } = useStoreContext();
  const { showTerm, eventId } = term;
  const { useGetAgreement, usePostConfirmAgreement } = useAPIServices();

  const { data } = useGetAgreement(eventId.toString());
  const { mutateAsync, isSuccess } = usePostConfirmAgreement();

  const handleConfirmation = () => {
    try {
      mutateAsync({ event_id: Number(eventId), user_id: Number(USER?.id) });
      if (isSuccess) {
        setTerm({ eventId: "", showTerm: false });
        navigate(`/live/${eventId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={showTerm ? "overflow-y-hidden" : "hidden"}>
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-white arial text-[#2c3e50] p-8 rounded- relative w-[88%] h-[95%] overflow-y-auto custom-scrollbar">
          <p className="text-5xl py-10">{data?.event_name}</p>
          <div
            id="term"
            dangerouslySetInnerHTML={{
              __html: data?.agreement_content as string,
            }}
            className="text-left max-w-[1140px] mx-auto text-[14px] flex flex-col gap-5"
          />
          <div className="my-10 text-white baloo flexcenter gap-5">
            <button
              onClick={() => setTerm({ eventId: "", showTerm: false })}
              className="bg-red-600 px-6 py-2 rounded-md"
            >
              Disagree
            </button>
            <button
              onClick={handleConfirmation}
              className="bg-green-600 px-6 py-2 rounded-md"
            >
              I agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
