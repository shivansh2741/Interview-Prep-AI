const DeleteAlertContent = ({ content, onDelete, onClose }) => {
    return (
        <div className="p-5">
            <p className="text-[14px]">{content}</p>
            <div className="flex justify-center mt-6 gap-3">
                <button
                    type="button"
                    className="btn-small bg-orange-400 hover:bg-orange-500 text-white w-1/3"
                    onClick={onClose}
                >
                    No
                </button>
                <button
                    type="button"
                    className="btn-small hover:bg-black bg-gray-800 text-white w-1/3"
                    onClick={onDelete}
                >
                    Yes
                </button>
            </div>
        </div>
    );
}

export default DeleteAlertContent;