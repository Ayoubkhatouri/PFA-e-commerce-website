package ensa.proj.pfa_project.web;

import ensa.proj.pfa_project.dtos.ProductDTO;
import ensa.proj.pfa_project.dtos.ShopDTO;
import ensa.proj.pfa_project.dtos.UserDTO;
import ensa.proj.pfa_project.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shops")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;

    @PostMapping("/create")
    public ShopDTO createShop(@RequestBody ShopDTO shopDTO){
        return shopService.saveShop(shopDTO);
    }
    @GetMapping("/getAll")
    public List<ShopDTO> getAllShops(){
        return shopService.getAllShops();
    }
    @GetMapping("/{id}")
    public ShopDTO getAllShop(@PathVariable Long id){
        return shopService.getShop(id);
    }
}
