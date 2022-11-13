import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import {
  Container,
  Header,
  ScrollContainer,
  FoodsContainer,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
  AdditionalsContainer,
  Title,
  TotalContainer,
  AdittionalItem,
  AdittionalItemText,
  // AditionalValue,
  AdittionalQuantity,
  ButtonQuantity,
  PriceButtonContainer,
  TotalPrice,
  QuantityContainer,
  FinishOrderButton,
  ButtonText,
  IconContainer,
} from './styles';

interface Params {
  idFood: number;
}

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
  formattedPriceExtra: string;
}

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  image_url: string;
  formattedPrice: string;
  extras: Extra[];
}

const FoodDetails: React.FC = () => {
  const [food, setFood] = useState({} as Food);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [foodQuantity, setFoodQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadFood(): Promise<void> {
      const response = await api.get(`/foods/${routeParams.idFood}`);

      const currentFood: Food = response.data;

      setFood({
        ...currentFood,
        formattedPrice: formatValue(currentFood.price),
      });

      setExtras(
        currentFood.extras.map((extra: Extra) => {
          return {
            ...extra,
            formattedPriceExtra: formatValue(extra.value),
            quantity: 0,
          };
        }),
      );
    }

    loadFood();
  }, [routeParams]);

  function handleIncrementExtra(id: number): void {
    const incrementExtra = extras.map((extra: Extra) => {
      return extra.id === id
        ? { ...extra, quantity: extra.quantity + 1 }
        : extra;
    });

    setExtras(incrementExtra);
  }

  function handleDecrementExtra(id: number): void {
    const decrementExtra = extras.map((extra: Extra) => {
      if (extra.id === id) {
        const validateQuantity =
          extra.quantity > 0 ? extra.quantity - 1 : extra.quantity;

        return { ...extra, quantity: validateQuantity };
      }

      return extra;
    });

    setExtras(decrementExtra);
  }

  function handleIncrementFood(): void {
    const quantity = foodQuantity + 1;

    setFoodQuantity(quantity);
  }

  function handleDecrementFood(): void {
    const quantity = foodQuantity > 1 ? foodQuantity - 1 : foodQuantity;

    setFoodQuantity(quantity);
  }

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      api.delete(`/favorites/${food.id}`);
    } else {
      api.post(`/favorites/${food.id}`);
    }
    setIsFavorite(!isFavorite);
  }, [isFavorite, food]);

  const cartTotal = useMemo(() => {
    const total = extras.reduce((accumulator, extra) => {
      return accumulator + extra.quantity * extra.value;
    }, 0);

    return formatValue((Number(food.price) + total) * foodQuantity);
  }, [extras, food, foodQuantity]);

  async function handleFinishOrder(): Promise<void> {
    await api.post('/orders', {
      product_id: food.id,
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
      thumbnail_url: food.image_url,
      extras,
    });
  }

  // Calculate the correct icon name
  const favoriteIconName = useMemo(
    () => (isFavorite ? 'favorite' : 'favorite-border'),
    [isFavorite],
  );

  useLayoutEffect(() => {
    // Add the favorite icon on the right of the header bar
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcon
          name={favoriteIconName}
          size={24}
          color="#FFB84D"
          onPress={() => toggleFavorite()}
        />
      ),
    });
  }, [navigation, favoriteIconName, toggleFavorite]);

  return (
    <Container>
      <Header />

      <ScrollContainer>
        <FoodsContainer>
          <Food>
            <FoodImageContainer>
              <Image
                style={{ width: 327, height: 183 }}
                source={{
                  uri: food.image_url,
                }}
              />
            </FoodImageContainer>
            <FoodContent>
              <FoodTitle>{food.name}</FoodTitle>
              <FoodDescription>{food.description}</FoodDescription>
              <FoodPricing>{food.formattedPrice}</FoodPricing>
            </FoodContent>
          </Food>
        </FoodsContainer>
        <AdditionalsContainer>
          <Title>Adicionais</Title>
          {extras.map(extra => (
            <AdittionalItem key={extra.id}>
              <AdittionalItemText>{extra.name}</AdittionalItemText>
              {/* <AditionalValue>{extra.formattedPriceExtra}</AditionalValue> */}
              <AdittionalQuantity>
                <ButtonQuantity
                  button
                  onPress={() => handleDecrementExtra(extra.id)}
                >
                  <Icon
                    size={15}
                    color="#fff"
                    name="minus"
                    testID={`decrement-extra-${extra.id}`}
                  />
                </ButtonQuantity>
                <AdittionalItemText testID={`extra-quantity-${extra.id}`}>
                  {extra.quantity}
                </AdittionalItemText>
                <ButtonQuantity
                  button={false}
                  onPress={() => handleIncrementExtra(extra.id)}
                >
                  <Icon
                    size={15}
                    color="#fff"
                    name="plus"
                    testID={`increment-extra-${extra.id}`}
                  />
                </ButtonQuantity>
              </AdittionalQuantity>
            </AdittionalItem>
          ))}
        </AdditionalsContainer>
        <TotalContainer>
          <Title>Total do pedido</Title>
          <PriceButtonContainer>
            <TotalPrice testID="cart-total">{cartTotal}</TotalPrice>
            <QuantityContainer>
              <Icon
                size={15}
                color="#6C6C80"
                name="minus"
                onPress={handleDecrementFood}
                testID="decrement-food"
              />
              <AdittionalItemText testID="food-quantity">
                {foodQuantity}
              </AdittionalItemText>
              <Icon
                size={15}
                color="#6C6C80"
                name="plus"
                onPress={handleIncrementFood}
                testID="increment-food"
              />
            </QuantityContainer>
          </PriceButtonContainer>

          <FinishOrderButton onPress={() => handleFinishOrder()}>
            <ButtonText>Confirmar pedido</ButtonText>
            <IconContainer>
              <Icon name="check-square" size={24} color="#fff" />
            </IconContainer>
          </FinishOrderButton>
        </TotalContainer>
      </ScrollContainer>
    </Container>
  );
};

export default FoodDetails;
