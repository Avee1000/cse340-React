// client/src/components/Loading.jsx
// import "../styles/Loading.css";

// export default function Loading() {
//   return (
//     <div className="loading-container">
//       <div className="spinner"></div>
//     </div>
//   );
// }

export function Loading({text}) {
  return (
      <main className="container py-5">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 240 }}>
          <div className="text-center">
            <div className="spinner-border" role="status" aria-label="Loading" />
            <p className="mt-3 mb-0">{text}</p>
          </div>
        </div>
      </main>
    );
}

export function ButtonLoading() {
  return (
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-label="Loading" aria-hidden="true"></span>
  );
}