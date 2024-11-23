interface AlertSuccessProps {
  title: string;
  message: string;
  time: string;
}

export const AlertSuccess = ({ title, time, message }: AlertSuccessProps) => {
  return (
    <div className="position-fixed top-4 end-10 sticky-top ">
      <div
        className="toast fade hide p-2 bg-white shadow border border-1 border-dark"
        role="alert"
        aria-live="assertive"
        id="successToast"
        aria-atomic="true"
      >
        <div className="toast-header border-0">
          <i className="material-icons text-success me-2">check</i>
          <span className="me-auto font-weight-bold">{title}</span>
          <small className="text-body">{time}</small>
          <i
            className="fas fa-times text-md ms-3 cursor-pointer"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></i>
        </div>
        <hr className="horizontal dark m-0" />
        <div
          className="toast-body text-black"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </div>
  );
};
