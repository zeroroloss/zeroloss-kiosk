package service.order;

import java.util.List;

import dto.OrderMenuDto;
import dto.OrderOptionDto;
import dto.OrdersDto;

public interface OrderService {
	void insertFullOrder(OrdersDto ordersDto,
							  List<OrderMenuDto> orderMenuList,
							  List<List<OrderOptionDto>> orderOptionLists) throws Exception;
}
