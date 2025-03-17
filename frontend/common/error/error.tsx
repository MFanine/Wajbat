export default function Error({ props }: any) {
  console.log(props);
  return (
    <div className="h-[80vh] flex justify-center items-center bg-background">
      <div className="w-[70vw] text-xl text-mainText text-center">
      Vous n'avez pas accès à cet itinéraire.
      </div>
    </div>
  );
}
