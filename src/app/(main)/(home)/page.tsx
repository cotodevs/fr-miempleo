import { webDAVService } from "@/app/(main)/(home)/services/nextcloudService";
import { TypingText } from "@/components/animate-ui/text/typing";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { ConfigProvider, Image, Result } from "antd";
import { FilesByFolderType } from "@/shared/interfaces/nextcloud";

const Home = async () => {
  const foldersAndFiles = await webDAVService.getFoldersAndFiles("Empleos");

  const photosWithBase64 = await Promise.all(
    foldersAndFiles.files.map(async (photo) => {
      const base64 = await webDAVService.getImageBase64(photo.path);
      return {
        ...photo,
        base64,
      };
    }),
  );
  // Organizar fotos por carpeta
  const filesByFolder: FilesByFolderType = photosWithBase64.reduce(
    (acc: FilesByFolderType, photo) => {
      const pathAfterEmpleos = photo.path.split("/Empleos/")[1];
      const folderForPhoto = pathAfterEmpleos.includes("/")
        ? pathAfterEmpleos.split("/")[0]
        : "Empleos";

      //validamos si la carpeta ya existe en el acumulador
      if (!acc[folderForPhoto]) acc[folderForPhoto] = [];

      acc[folderForPhoto].push(photo);

      return acc;
    },
    {},
  );

  return (
    <section className={"min-h-screen bg-cotoneb3"}>
      <header
        className={
          "pointer-events-none relative left-0 top-0 h-36 bg-[url('/images/FondoTH-movil.jpg')] bg-cover bg-center bg-no-repeat md:h-48 md:bg-[url('/images/FondoTH-desktop.jpg')] 2xl:h-72 2xl:bg-cover"
        }
      ></header>
      <main className={"flex flex-col items-center justify-center"}>
        <section className={"mb-5 flex flex-col"}>
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
        <section className={"mb-5 flex flex-col text-center text-white"}>
          <p className="text-center text-lg font-semibold">
            Para aplicar a una vacante, envía tu CV al correo
          </p>
          <a
            className={"italic underline"}
            href="mailto:rrhh@cotonebrlesmicoope.com.gt"
          >
            rrhh@cotonebrlesmicoope.com.gt
          </a>
          <p className={"mt-2"}>
            O lleva tu papeleria a nuestra agencia central ubicada en Santa
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
          className={
            "absolute h-[600px] opacity-30 md:h-[500px] md:w-[500px] 2xl:w-[600px]"
          }
        ></div>

        {photosWithBase64.length > 0 ? (
          <section className={"px-10 pb-10 text-white"}>
            {Object.entries(filesByFolder).map(([folderName, photos]) => (
              <div
                key={folderName}
                className={"flex flex-col items-center justify-center"}
              >
                <h2
                  className={"mb-3 text-center text-lg font-semibold underline"}
                >
                  {decodeURI(folderName)}
                </h2>
                <div
                  className={
                    "relative flex flex-row flex-wrap items-center justify-center gap-10"
                  }
                >
                  {photos.map((photo) => (
                    <MotionEffect
                      key={photo.path}
                      slide={{ direction: "down", offset: 100 }}
                    >
                      <div
                        key={photo.path}
                        className="flex h-80 w-60 flex-col items-center justify-center rounded-lg bg-white p-2 shadow shadow-gray-200 hover:border-4 hover:border-cotoneb"
                      >
                        <Image
                          src={`data:${photo.contentType};base64,${photo.base64}`}
                          alt={photo.name}
                          className="top-0 rounded-lg object-contain"
                          width={210}
                          height={240}
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
          <div className={"z-40 rounded-3xl"}>
            <ConfigProvider
              theme={{
                token: {
                  colorTextDescription: "#ffffff",
                  colorTextHeading: "#ffffff",
                },
              }}
            >
              <Result
                status={"404"}
                title="No hay vacantes disponibles"
                subTitle="Por el momento no hay vacantes disponibles. Por favor, revisa más tarde."
              />
            </ConfigProvider>
          </div>
        )}

        <img
          src="/images/cotoneb.png"
          alt="Logo COTONEB"
          width={200}
          className="my-6"
        />
      </main>
    </section>
  );
};

export default Home;
