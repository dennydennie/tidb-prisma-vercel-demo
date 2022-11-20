import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";

export default function BasicCard(props: any) {
  const { id, title } = props;
  return (
    <Card
      sx={{
        display: "flex",
        flex:'flex-shrink',
        gap: "20px",
        flexWrap: "wrap",
        margin: "auto",
      }}
    >
      <Box>
        <CardMedia>
          {/* <Image
            //load image src
            src={``}
            width={254}
            height={140}
          /> */}
        </CardMedia>
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          ></Typography>
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
          onClick={() => {
          }}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
