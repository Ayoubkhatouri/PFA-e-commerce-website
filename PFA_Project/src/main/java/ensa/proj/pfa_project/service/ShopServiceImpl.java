package ensa.proj.pfa_project.service;

import ensa.proj.pfa_project.dtos.ShopDTO;
import ensa.proj.pfa_project.dtos.UserDTO;
import ensa.proj.pfa_project.entities.Role;
import ensa.proj.pfa_project.entities.Shop;
import ensa.proj.pfa_project.entities.User;
import ensa.proj.pfa_project.mappers.ShopMapperImpl;
import ensa.proj.pfa_project.mappers.UserMapperImpl;
import ensa.proj.pfa_project.repositories.ShopRepository;
import ensa.proj.pfa_project.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ShopServiceImpl implements ShopService{

    private ShopRepository shopRepository;
    private ShopMapperImpl shopMapper;
    private ProductService productService;


    private UserRepository userRepository;
    @Override
    public ShopDTO saveShop(ShopDTO shopDTO) {
        Shop shop=shopMapper.fromShopDTO(shopDTO);
        User user=userRepository.findById(shopDTO.getUserId()).orElseThrow();
        user.setRole(Role.ADMIN);
        userRepository.save(user);
        shopRepository.save(shop);
        return shopMapper.fromShop(shop);

    }

    @Override
    public List<ShopDTO> getAllShops() {
        return shopRepository.findAll().stream().map(s->shopMapper.fromShop(s)).collect(Collectors.toList());
    }

    @Override
    public ShopDTO getShop(Long id) {
        return shopMapper.fromShop( shopRepository.findById(id).orElseThrow());
    }

    @Override
    public ShopDTO editShop(Long id, String name, String description) {
        Shop shop=shopRepository.findById(id).orElseThrow();
        shop.setName(name);
        shop.setDescription(description);
        Shop s=shopRepository.save(shop);
        return shopMapper.fromShop(s);
    }

    @Override
    public void deleteShop(Long id) {
        Shop shop=shopRepository.findById(id).orElseThrow();
        shop.getProducts().forEach(p->productService.deleteProduct(p.getId()));
        shopRepository.delete(shop);
    }


}
