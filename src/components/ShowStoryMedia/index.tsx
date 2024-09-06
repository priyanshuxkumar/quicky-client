'use client';
import Image from "next/image";
import React from "react";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Share, X , ImageIcon} from 'lucide-react'

//Story Upload Component
const ShowStoryMedia = ({selectedImageURL, setSelectedImageURL ,handleSelectMedia  , isSelectedStoryMediaPageShowing ,setIsSelectedStoryMediaPageShowing,handleSelectStoryMediaVisibility,handleUploadStory}: any) => {
  return (
    <Dialog open={isSelectedStoryMediaPageShowing} onOpenChange={setIsSelectedStoryMediaPageShowing}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Story</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsSelectedStoryMediaPageShowing(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {selectedImageURL ? (
            <div className="relative aspect-square">
              <Image
                src={selectedImageURL}
                alt="Selected story image"
                className="w-full h-full object-cover rounded-md"
                width={200}
                height={200}
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 "
                onClick={() => (setSelectedImageURL(null))}
              > 
                <X className="h-4 w-4"/>
              </Button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer"
              onClick={handleSelectMedia}
            >
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Click to select an image</p>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsSelectedStoryMediaPageShowing(false)}>
              Cancel
            </Button>
            <Button onClick={handleUploadStory} disabled={!handleSelectMedia} className="text-black dark:text-white">
              <Share className="mr-2 h-4 w-4" /> Share Story
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowStoryMedia;
