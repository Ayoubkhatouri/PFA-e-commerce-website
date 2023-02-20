package ensa.proj.pfa_project.web;

import ensa.proj.pfa_project.dtos.ProductDTO;
import ensa.proj.pfa_project.dtos.ShopDTO;
import ensa.proj.pfa_project.dtos.UserDTO;
import ensa.proj.pfa_project.service.ShopService;
import lombok.Data;
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
    @GetMapping("/anyOne/getAll")
    public List<ShopDTO> getAllShops(){
        return shopService.getAllShops();
    }
    @GetMapping("/anyOne/{id}")
    public ShopDTO getShop(@PathVariable Long id){
        return shopService.getShop(id);
    }

    @PutMapping("/admin/edit/{id}")
    public ShopDTO editShop(@PathVariable Long id,@RequestBody ShopEditRequest shopEditRequest){
        return shopService.editShop(id,shopEditRequest.name,shopEditRequest.description);
    }
}

@Data
class ShopEditRequest{
    String name;
    String description;
}
