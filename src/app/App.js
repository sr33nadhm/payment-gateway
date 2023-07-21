import { Alert, Avatar, Box, Button, Card, Divider, Snackbar, Stack, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NavBar from "../components/NavBar";
import "./App.css";
import { useState } from "react";

function App() {
  const [warn, setWarn] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const startPayment = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: "rzp_test_FboYvYFZbjgJW0",
      amount: "100",
      currency: "USD",
      name: "Sreenadh M",
      description: "Dummy Payment",
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACECAMAAACJWBirAAAAn1BMVEX///8AAABWsyBfX19wcHCIiIjIyMj19fVKrwD4+PhSshesrKzx8fHc3Nz8/Pw7Ozvq6upBrABra2vOzs5+fn6bm5vk5OQQEBAdHR28vLwVFRVGRkaQkJBAQEDV1dWlpaUxMTGXzYHs9ejk8d4pKSlVVVXW6s50vlXN5sKLyHPF4rm02qTz+fGp1ZdjuDhNTU2h0YxwvUuAw2K83q8jpQBS/xF5AAAIkElEQVR4nMVcaXeqOhTFGZkqoiJq1ap1aC2t7fv/v+0x5ZCZBOjt/nLXdSHZnvmcJDWM2vDmUf0vt4XJutOZTv6YRLTqJFjt/pLDuN8psA/+jMRw3ynRc/+EQymIApvRvydhrzo0VvN/zGH7xHDIeNhyedyP5xTHexscFrQySqyjsYjB9eUSd03TN81ufPk6N2TiDIQcMh4270vXW7K81UWwTL/7cqzPwZ3RRtljiNh0GHuL/ZIBMPEv51oUPHcakgsmgcKzlzSNLfGt48VkOeQSuR30Sdiv9HJTJ/2cthPSV94FHFKY3asehSGtigSQyLZr3DLwr3kXX8ghhf+izGC0HexZDn1M/Z4NvhviUfTwMKUkEnHcPCUK0eyTpdAJqYzubAqTGWiRSGh8VzFwo82awyDBho0Lk8yFTw4mIQUSqTQEq3uOG0SbTzZKc5SB85iRpnlTIZHYxkf+eDQMtlvX3QbDaDefTXuvz4z3YehtuRwy4fWwGP4jM0zTtCzTzP3HzAOHZEmWg2otcRR7aLLw1/V8vl7fLulDVpxZqFD0DGYLRQ6GcZGwKH59EkwKTul/wurlUzzvNErMq8QozJ/8mTf0jJ8mNzUxDJU8W0EUZhGqjmA45ocKi/VmqMOAWIElUUSIA/7hQc4iXE/thahqEONLqBArvrPS8t/ELFav82hbq568P4QK8YvC4gXnaX1jLGaDWT/BbDPf2UNXyw5IiBVivuVPvJFPJAICHxHHI028ixRiFoHyQMkq8V3EImyNxbdAIVZhmR79gPkOUStsrbeJsYV9v6w5/cIy32mNJd67bJvFvWRhXq7H69cjrzzNorY6MgqzLsa+bRbH8u153r5fY7MMV7yQFhvPv8ci0XcO7+Z3UaTgZdvYQGXtqn0WSRGDGqCP/4ocxs+2Rq9tH8FYJIaB6n1UcHNTTGxM22ZxwN9vxmTbwY0l1sOAKr+taYgXEytYeFd654bVxIoHbbMwyDRiPTAaN65VJDF1g1jo5m9vPBqNeenmhZS6WTY/guonSS87xEJrbDja9bNA8zxjv0blKsxhY0HTejSiGiwWeMsYzqn8Tyerrlnk8w9BmouNkgV3+MBFRPUKT5R70dkqidAp+KaZq2yozWLeYUDKkXFHP6srXgSi8JOAFqA3qQ7ICm3sZ/PI3qDBATF89djl7uLiJ0v4LhLvRo2EnT18ioqedDIPWT9nCs/UQEVlh5+G1cmpYDFTIrHInn3FmpNt9oIT7rN3dkHvLNCHFWfiQ9OHngoJL0t+U+KzUfYGfGrAKWR+RD1K0aqh+cCTCovMlvfUh5P0wyXePzJFXfKbBSSK2QFMrFRY9BgbSLFjrPugNjgoG5SZBgsnZPSRYc9I6CqfaSGgBqUM4QrtcMQVRRFCyDJJ2A/gkjBh7AnBU6HASFc7cdhu2dAljNcYCesNnnY1gmeqvR6ncV2s6MhlpBWmbJaStgnYAHiBWCiErbQwm3KyufPEC77nWCYO84GXYQ6qwhXC1pRvnDkL9lccbsLhr2V9Eb/GQ5Vnr7pD1mSRuApvGJ8q40FvC6Ca78nhvIZl0ddhkfC4+JRALNO/sVsC4KoV07NJEKST4NchiygNGP1hwPsd3vHr0k0HiymSf+PLO287AHK73FVdhWngXjD4OZ7fb9+P+PH98nMV7EiM0TvkO7TivSoMiuUBD2iEwbM7TRYD6SukQE7y/KcskHnyYvO/YwEFsLQx+m0WC1R6Ss2TYbFfr5ntgwYsYJ4jLfpoFnOHs8nbhIVSoUMtWGhv3h4LKDFk8xySBUp947U2C0eQKaDEkBkGyQIMea7MYjxZbIf2ZrYXOMEYVcC8TMVnAU5tK7NAeg9F+Qo9sJKk1aayGCHdCX0AIoZkoNPnLud9cj/moLqmg4Qmqbea+gg8KXYBSCXiHRE6NGSWTO/AS1ggoS3Fj0ClI1YJzSLLwPQJDDELKE8aKY1hkfEdUh+Kl1Can8G5AVUWn1mtDAV8JQvYe5CQKN1emFf55z0owxCy2KInpP2GG1Y9RbGYUG+vYAFjVflwF+xMFLj4ecQjVSJiMQJFyjdGIaOJcgnJom8XIL1ExAIUXlEeA9u1gG2TWsuDUU3VeALsTGCfTViAQ8vLfANL75/tswBRVI+5oV7hm3EDFuBI0mCRA+yTL7YGLOCrCudzS6fjZr2Ivy4J7jdB13uVkyQQ6vnCiKa9Ckz5ho0StloX60BX3tqeewqYCahMEQ2sEJF3rJqAE3iKbYIHrNW3bCoBehbmBhqQc8IGp0BIQDGp3jE5J+2vVAG8VD4RIFCKr6Xt1dK/Nc7yQ9NQ1FJN4YBpipIkF2Uh2YpOIFRoyrasF1oIGmX7WJlMSSwgdCnFWykgdHeWuu8quy1Z76yCUXmYXzv+lHVRk+llivJFmvpIAR2S5gkAGpvyPapRE0epkyYHVOymP6b0k6X6+VYxCbX9YgaT8iD6so4wDaImeq170wZrgp9qvaOsKSo3PCTYNaOBV4dNElIZenWSYQF84tboQtoYu6qhG/hwEjUtEwGz0M5Sy2GxOKF2kEEGLHjpyHWMt8+CNk8HwQl730CxPHDxiXRtH8VBDK16SsYR4UftP2vGGgrkoKY6Do+ILrIFdeQIiG0YwdURwJC4lsc7FVCXBm4bnZNMHGNy0NZvrZcwSIftyG6xkHsD7XUSOUbUeHfGVUtAzT1b7O1yeNRI80SfHkwv85CPtHdWFAMl7M5qR+icuZ/49Dt3ql3mTuoA0nXA3EhrWK2K4TB3AJfTIFGMYzMclrpnZnVAayXB83xzYj5UC7G1MeJciWSw+k1B5Ij4N5YxzNpJHHI4GykH+uDtr0FyefrUeqCSgAlQOZbz9nKXEobsldVwUL/ar42Aksfmj/7+hDuAKcd612YK18RklxaYYW/4B39ogUAwmLd1/+Z//amE8l5cLwEAAAAASUVORK5CYII=",
      prefill: {
        name: "John Doe",
        contact: "+919645243474",
        email: "sreenadhm01@gmail.com",
      },
      config: {
        display: {
          blocks: {
            utib: { //name for Axis block
              name: "Pay using Axis Bank",
              instruments: [
                {
                  method: "card",
                  issuers: ["UTIB"]
                },
                {
                  method: "netbanking",
                  banks: ["UTIB"]
                },
                {
                  method: "upi"
                }
              ]
            },
            other: { //  name for other block
              name: "Other Payment modes",
              instruments: [
                {
                  method: "card",
                  issuers: ["ICIC"]
                },
                {
                  method: 'netbanking',
                }
              ]
            }
          },
          sequence: ["block.utib", "block.other"],
          preferences: {
            show_default_blocks: false // Should Checkout show its default blocks?
          }
        }
      },
      handler: async function (response) {
        console.log(response);
        if (response.razorpay_payment_id) {
          setSeverity("success");
          setMessage("Transaction completed successfully!!");
          setWarn(true);
        } else {
          setSeverity("error");
          setMessage("Transaction failed!");
          setWarn(true);
        }
      },
      notes: {
        address: "https://sr33nadhm.github.io",
      },
      theme: {
        color: "#1c1c1c",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="App">
      <NavBar />
      <Snackbar open={warn} autoHideDuration={6000} onClose={() => setWarn(false)}>
        <Alert onClose={() => setWarn(false)} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <header className="App-header">
        <Card className="app-card">
          <Box className="card-box">
            <Avatar
              variant="rounded"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBk73Dr_BDvVJrcmmWksbhE4TWzPMu0ScFtRdcvDB3RQ&s"
            />
            <Stack spacing={1}>
              <Typography fontWeight={200} className="address-row">
                Proceed with Payment
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ marginLeft: 8 }}>
                $ 1.0
              </Typography>
              <Divider />
              <Typography variant="body2" color="text.secondary" className="card-desc">
                Welcome! This is an example for payment gateway integration. This is just a dummy transaction to
                simulate the capabilities of a payment gateway and just to show how easy it is to complete a payment.
                Please refrain from providing actual data.
                <br /> <br />
                Not sure how to enter dummy payment details? Or need a dummy card input for Razorpay?
                See the Razorpay dummy card inputs <a href="https://razorpay.com/docs/payments/payments/test-card-details/#test-card-for-indian-payments">here</a>
                <br /> <br />
                <b>Please click on checkout to proceed!</b>
              </Typography>
            </Stack>
          </Box>
          <Divider />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2, py: 1, bgcolor: "background.default" }}
          >
            <Button variant="contained" color="success" endIcon={<AttachMoneyIcon />} onClick={startPayment}>
              Checkout
            </Button>
          </Stack>
        </Card>
      </header>
    </div>
  );
}

export default App;
