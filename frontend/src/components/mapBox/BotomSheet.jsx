import { Button } from "@material-tailwind/react";
import { FlagIcon, HeartIcon } from "@heroicons/react/20/solid";
import { Sheet } from "react-modal-sheet";

export default function BottomSheet() {
    
  return (
    <>
      {bottomSheet && (
        <Sheet
          isOpen={bottomSheet}
          onClose={() => setBottomSheet(null)}
          longitude={bottomSheet.longitude}
          latitude={bottomSheet.latitude}
          detent="content-height"
        >
          <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
              <div className="flex flex-col gap-4 px-4 pb-4">
                <div className="flex gap-2">
                  <Icon className="h-5 w-10 rounded-xl" />
                  <h3 className="font-bold">{bottomSheet.country}</h3>
                </div>
                <div className="flex flex-row gap-2">
                  <Button
                    className="flex items-center gap-2 rounded-full w-1/2 h-14 bg-white text-gray-600"
                    onClick={() => markAsVisited(bottomSheet.id)}
                  >
                    <FlagIcon className="h-5 w-5" />
                    Visited
                  </Button>
                  <Button
                    className="flex items-center gap-2 rounded-full w-1/2 h-14 bg-white text-gray-600"
                    onClick={() => addToWishList(bottomSheet.id)}
                  >
                    <HeartIcon className="h-5 w-5" />
                    Want to visit
                  </Button>
                </div>
              </div>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
      )}
    </>
  );
}
