package ensa.proj.pfa_project.mappers;


import ensa.proj.pfa_project.dtos.ShopDTO;
import ensa.proj.pfa_project.entities.Shop;
import ensa.proj.pfa_project.entities.User;
import ensa.proj.pfa_project.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShopMapperImpl {


    private final ProductMapperImpl productMapper;
    private final UserRepository userRepository;

    public ShopDTO fromShop(Shop shop){
        ShopDTO shopDTO=new ShopDTO();
        BeanUtils.copyProperties(shop,shopDTO);
        User user=userRepository.findById(shop.getUser().getId()).orElseThrow();
        shopDTO.setUserId(user.getId());
        shopDTO.setOwnerFirstName(user.getFirstname());
        shopDTO.setOwnerLastName(user.getLastname());
        shopDTO.setProductsDto(shop.getProducts().stream().map(p->productMapper.fromProduct(p)).collect(Collectors.toList()));
        return shopDTO;
    }

    public Shop fromShopDTO(ShopDTO shopDTO){
        Shop shop=new Shop();
        BeanUtils.copyProperties(shopDTO,shop);
        shop.setUser(userRepository.findById(shopDTO.getUserId()).orElseThrow());
        shop.setProducts(shopDTO.getProductsDto().stream().map(p->productMapper.fromProductDTO(p)).collect(Collectors.toList()));
        return shop;
    }
}
