package ensa.proj.pfa_project.service;


import ensa.proj.pfa_project.dtos.ShopDTO;
import ensa.proj.pfa_project.dtos.UserDTO;
import ensa.proj.pfa_project.entities.User;

import java.util.List;

public interface ShopService {
    ShopDTO saveShop(ShopDTO shopDTO);
   List<ShopDTO> getAllShops();
   ShopDTO getShop(Long id);
}
