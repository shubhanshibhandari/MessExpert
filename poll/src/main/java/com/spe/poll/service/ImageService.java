package com.spe.poll.service;

import com.spe.poll.model.Image;
import com.spe.poll.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;
    public Image addMenu(Image image){
        Optional<Image> img=imageRepository.findByFileName("IIITB_MENU");
        Image newImg=img.get();
        newImg.setFileName("IIITB_MENU");
        newImg.setImageData(image.getImageData());
        System.out.println("Menu image added !!");
        return imageRepository.save(newImg);
    }

    public Image findMenuImageByFileName(String filename){
        Optional<Image> image=imageRepository.findByFileName(filename);
        return image.get();
    }

    public void deleteSplMenu(){
        Optional<Image> img=imageRepository.findByFileName("IIITB_SPL_MENU");
        Image newImg=img.get();
        newImg.setFileName("IIITB_SPL_MENU");
        newImg.setImageData(null);
        System.out.println("Menu image deleted !!");
        imageRepository.save(newImg);
    }
    public Image addSplMenu(Image image){
        Optional<Image> img=imageRepository.findByFileName("IIITB_SPL_MENU");
        Image newImg=img.get();
        newImg.setFileName("IIITB_SPL_MENU");
        newImg.setImageData(image.getImageData());
        System.out.println("Menu image added !!");
        return imageRepository.save(newImg);
    }

    public Image findMenuImage(){
        return imageRepository.getImageByImageDataNotNull().get();
    }
}