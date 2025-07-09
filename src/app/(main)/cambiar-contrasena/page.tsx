import PassChangeForm from "@/shared/components/PassChangeForm";

const PasswordChangePage = () => {
  return (
    <div className="grid min-h-[calc(100vh-64px-58px)] place-items-center">
      <div className="max-w-96">
        <h2 className="mb-4 text-center text-xl font-semibold">
          Cambiar contraseña
        </h2>
        <PassChangeForm />
      </div>
    </div>
  );
};
export default PasswordChangePage;
