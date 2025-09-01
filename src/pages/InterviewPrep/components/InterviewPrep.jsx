import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import RoleInfoHeader from "./RoleInfoHeader";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { AnimatePresence, motion } from "framer-motion";
import QuestionCard from "../../../components/Card/QuestionCard";
import AIResponsePreview from "./AIResponsePreview";
import Drawer from "../../../components/Drawer";
import SkeletonLoader from "../../../components/Loader/SkeletonLoader";

const InterviewPrep = () => {
    const { sessionId } = useParams();

    const [sessionData, setSessionData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState("");

    const [explanation, setExplanation] = useState(false);
    const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);

    console.log(explanation)

    const fetchSessionById = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));

            console.log(response)

            if (response.data && response.data.session) {
                setSessionData(response.data.session);
            }
        }
        catch (error) {
            console.log("Error:", error);
        }
    }

    const generateConceptExplanation = async (question) => {
        try {
            setErrMessage("");
            setExplanation(null);

            setIsLoading(true);
            setOpenLeanMoreDrawer(true);

            const response = await axiosInstance.post(
                API_PATHS.AI.GENERATE_EXPLANATION,
                {
                    question
                }
            );

            if (response.data) {
                setExplanation(response.data.data);
            }
        }
        catch (error) {
            setExplanation(null);
            setErrMessage("Failed to generate explanation. Try again later.");
            console.log(`Error: ${error}`);
        }
        finally {
            setIsLoading(false);
        }
    }

    const generateMoreQuestions = () => { }

    const toggleQuestionPinStatus = async (questionId) => {
        try {
            const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));

            console.log(response);

            if (response.data && response.data.question) {
                //toast Success
                fetchSessionById();
            }
        }
        catch (error) {
            console.log(`Error: ${error}`)
        }
    }


    useEffect(() => {
        if (sessionId) {
            fetchSessionById();
        }

        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <DashboardLayout>
                <RoleInfoHeader
                    role={sessionData?.role || ""}
                    topicsToFocus={sessionData?.topicsToFocus || ""}
                    experience={sessionData?.experience || ""}
                    questions={sessionData?.questions?.length || ""}
                    description={sessionData?.description || ""}
                    lastUpdated={sessionData?.updatedAt ? moment(sessionData.updatedAt).format("Do MMM YYYY") : ""}
                /><div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
                    <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>

                    <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
                        <div
                            className={`col-span-12 ${openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
                                }`}
                        >
                            <AnimatePresence>
                                {sessionData?.questions?.map((data, index) => {
                                    return (
                                        <motion.div
                                            key={data._id || index}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{
                                                duration: 0.4,
                                                type: "spring",
                                                stiffness: 100,
                                                delay: index * 0.1,
                                                damping: 15,
                                            }}
                                            layout
                                            layoutId={`question-${data._id || index}`}
                                        >
                                            <QuestionCard
                                                question={data?.question}
                                                answer={data?.answer}
                                                onLearnMore={() =>
                                                    generateConceptExplanation(data.question)
                                                }
                                                isPinned={data?.isPinned}
                                                onTogglePin={() =>
                                                    toggleQuestionPinStatus(data._id)
                                                }
                                            />
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                <div>
                    <Drawer
                        isOpen={openLeanMoreDrawer}
                        onClose={() => setOpenLeanMoreDrawer(false)}
                        title={!isLoading && explanation?.title}
                    >
                        {errMessage && (
                            <p className="flex gap-2 text-sm text-amber-600 font-medium">
                                {/* icon here */}
                            </p>
                        )}
                        {isLoading && <SkeletonLoader />}
                        {!isLoading && explanation && (
                            <AIResponsePreview content={explanation?.explanation} />
                        )}
                    </Drawer>
                </div>
            </DashboardLayout>
        </div>
    );
}

export default InterviewPrep;