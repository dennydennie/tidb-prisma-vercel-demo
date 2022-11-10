import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useSnackbar } from "notistack";

import { shoppingCartState } from "atoms";
import { useRecoilState } from "recoil";

import { HouseProps } from "const";

export default function BasicCard(props: HouseProps) {
  const { id } = props;
  const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartState);

  const { enqueueSnackbar } = useSnackbar();
  const handleClick = () => {
    enqueueSnackbar(`"${title}" was successfully added.`, {
      variant: "success",
    });
  };

  const addItem = () => {
    setShoppingCart((oldShoppingCart) => {
      const existingItem = oldShoppingCart.find((i) => i.id === id);
      if (existingItem) {
        if (existingItem.quantity >= stock) {
          enqueueSnackbar(`Out of stock!`, { variant: "error" });
          return [...oldShoppingCart];
        }
        const newItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        enqueueSnackbar(`"${title}" was successfully added.`, {
          variant: "success",
        });
        return [...oldShoppingCart.filter((i) => i.id !== id), newItem];
      }
      enqueueSnackbar(`"${title}" was successfully added.`, {
        variant: "success",
      });
      return [
        ...oldShoppingCart,
        {
          ...props,
          quantity: 1,
        },
      ];
    });
  };

  return (
    <Card
      sx={{
        width: 256,
        boxShadow:
          "0 0.5em 1em -0.125em hsl(0deg 0% 4% / 10%), 0 0 0 1px hsl(0deg 0% 4% / 2%)",
        border: "1px solid #e9eaee",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <CardMedia>
          <Image
            //load image src
            src={``}
            alt={title}
            width={254}
            height={140}
          />
        </CardMedia>
        <CardContent>
          {type && (
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {type.replaceAll(`_nbsp_`, ` `).replaceAll(`_amp_`, `&`)}
            </Typography>
          )}
          <Link href={`/house/${id}`}>
            <Typography variant="h5" component="div" sx={{ cursor: "pointer" }}>
              {title}
            </Typography>
          </Link>

          <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
        </CardContent>
      </Box>
      <CardActions>
        <IconButton
          aria-label="add to cart"
          disabled={stock <= 0}
          onClick={() => {
            addItem();
          }}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
