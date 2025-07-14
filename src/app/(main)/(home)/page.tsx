import { webDAVService } from "@/app/(main)/(home)/services/nextcloudService";
import { TypingText } from "@/components/animate-ui/text/typing";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { ConfigProvider, Result, Image } from "antd";
import { FilesByFolderType } from "@/shared/interfaces/nextcloud";
import OptimizedJobImage from "./components/OptimizedJobImage";

const Home = async () => {
  // SOLO obtener la lista de archivos (rápido) - SIN descargar imágenes
  const foldersAndFiles = await webDAVService.getFoldersAndFiles("Empleos");

  // Organizar archivos por carpeta SIN cargar las imágenes
  const filesByFolder: FilesByFolderType = foldersAndFiles.files.reduce(
    (acc: FilesByFolderType, photo) => {
      const pathAfterEmpleos = photo.path.split("/Empleos/")[1];
      const folderForPhoto = pathAfterEmpleos.includes("/")
        ? pathAfterEmpleos.split("/")[0]
        : "Empleos";

      if (!acc[folderForPhoto]) acc[folderForPhoto] = [];
      acc[folderForPhoto].push(photo);
      return acc;
    },
    {},
  );

  return (
    <section className="min-h-screen bg-cotoneb3">
      <header className="pointer-events-none relative left-0 top-0 h-36 bg-[url('/images/FondoTH-movil.jpg')] bg-cover bg-center bg-no-repeat md:h-48 md:bg-[url('/images/FondoTH-desktop.jpg')] 2xl:h-72 2xl:bg-cover" />
      <main className="flex flex-col items-center justify-center">
        <section className="mb-5 flex flex-col px-3">
          <TypingText
            className="text-start text-3xl font-semibold text-white md:text-4xl"
            text="Vacantes disponibles"
            cursor={true}
            cursorClassName="h-19 bg-white"
            inViewOnce={true}
            delay={0.9}
            loop={true}
          />
        </section>
        <section className="mb-5 flex flex-col px-3 text-center text-white">
          <p className="text-center text-lg font-semibold">
            Para aplicar a una vacante, envía tu CV al correo
          </p>
          <a
            className="italic underline"
            href="mailto:rrhh@cotonebrlesmicoope.com.gt"
          >
            rrhh@cotonebrlesmicoope.com.gt
          </a>
          <p className="mt-2">
            O lleva tu papelería a nuestra agencia central ubicada en Santa
            María Nebaj
          </p>
        </section>
        <div
          style={{
            backgroundImage: `url(images/SILUETA-EDIFICIO.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="absolute h-[600px] opacity-30 md:h-[500px] md:w-[500px] 2xl:w-[600px]"
        />

        {/* Ahora renderiza inmediatamente con la estructura optimizada */}
        {foldersAndFiles.files.length > 0 ? (
          <section className="px-10 pb-10 text-white">
            {Object.entries(filesByFolder).map(([folderName, photos]) => (
              <div
                key={folderName}
                className="flex flex-col items-center justify-center"
              >
                <h2 className="mb-3 text-center text-lg font-semibold underline">
                  {decodeURI(folderName)}
                </h2>
                <div className="relative flex flex-row flex-wrap items-center justify-center gap-10">
                  {photos.map((photo, index) => (
                    <MotionEffect
                      key={photo.path}
                      slide={{ direction: "down", offset: 200 }}
                    >
                      <div className="flex h-80 w-60 flex-col items-center justify-center rounded-lg bg-white p-2 shadow shadow-gray-200 hover:border-4 hover:border-cotoneb">
                        <OptimizedJobImage
                          photo={photo}
                          priority={index < 4} // Priorizar las primeras 4 imágenes
                        />
                        <p className="mt-2 text-wrap text-center text-base font-semibold italic text-cotoneb">
                          {photo.name.split(".")[0]}
                        </p>
                      </div>
                    </MotionEffect>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ) : (
          <div className="z-40 rounded-3xl">
            <ConfigProvider
              theme={{
                token: {
                  colorTextDescription: "#ffffff",
                  colorTextHeading: "#ffffff",
                },
              }}
            >
              <Result
                status="404"
                title="No hay vacantes disponibles"
                subTitle="Por el momento no hay vacantes disponibles. Por favor, revisa más tarde."
              />
            </ConfigProvider>
          </div>
        )}

        <Image
          src="/images/cotoneb.png"
          alt="Logo COTONEB"
          width={200}
          className="my-6"
          preview={false}
        />
      </main>
    </section>
  );
};

export default Home;
