import { Routes, Route, Link } from "react-router-dom";
import { Footer } from "../Template/Footer";
import { Header } from "../Template/Header";

export function Index() {
  return (
    <>
      <Header />
      <div className="intro">
        <p>
          We are here to teach what{" "}
          <span style={{ color: "green" }}>matters</span>
        </p>
        <p style={{ fontSize: "3rem" }}>
          and will lead to your{" "}
          <span style={{ color: "rebeccapurple" }}>dreams</span> fulfill
        </p>
      </div>

      <div className="tap-course">
        <button>
          <Link to="/courses">Check out the courses</Link>
        </button>
      </div>

      <div className="feat">
        <a>Taught 1M+</a>
        <a>100+ Companies</a>
        <a>Great Services</a>
      </div>

      <div className="yt">
        <p style={{ fontSize: "1.3rem", marginBottom: "1.5rem" }}>
          Check the demo
        </p>
        <div className="video-wrap">
          <iframe
            src="https://www.youtube.com/embed/oCDIpQ2jp-o?rel=0&modestbranding=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%" }}
          ></iframe>
        </div>
      </div>

      <div className="free-learning">
        <button>
          <a href="https://www.youtube.com/@harkirat1">
            Explore our free teachings
          </a>
        </button>
      </div>

      <div className="companies">
        <p>
          Companies our <i style={{ color: "aquamarine" }}>students</i> are
          working with
        </p>

        <div className="company">
          <img
            src="https://imgs.search.brave.com/zFRPpYaZY4zpqs1TMTgiR3DHsKmEKR9eoEDpbwb240s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzM5LzEvY2FsLWNh/bGlmb3JuaWEtZ29s/ZGVuLWJlYXJzLWxv/Z28tcG5nX3NlZWts/b2dvLTM5OTI4Ni5w/bmc"
            alt="Company 1"
          />
          <img
            src="https://imgs.search.brave.com/d9YlcQnHyhJ1uvLkYB-_pCYfqnju3ttsg_ZBe53fuhM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzA4/L2dvbGRtYW5zYWNo/cy1sb2dvLmpwZw"
            alt="Company 2"
          />
          <img
            src="https://imgs.search.brave.com/8xtKdURqFnna4KKPIbhHjlUO2MRYWfvOG2Ln_SM69Zc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2Lzk1LzEzLzgx/LzM2MF9GXzY5NTEz/ODE0OV9HZFJJUHhT/b1hVMGE2VGdINlNs/M1o5VEdhT1NqekhC/ZC5qcGc"
            alt="Company 3"
          />
          <img
            src="https://imgs.search.brave.com/sDJmksQFfVi97cGA_vyT8nZURITMTEHujta4-y2afaM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5kZXNpZ25ydXNo/LmNvbS9pbnNwaXJh/dGlvbl9pbWFnZXMv/NzMwNjEyL2NvbnZl/cnNpb25zL01JQ1JP/U09GVC1MT0dPLURF/U0lHTi1TVkctZGVz/a3RvcC5qcGc"
            alt="Company 4"
          />
          <img
            src="https://imgs.search.brave.com/vIXMhvwrO1IvlI6AQJuo5B3QGgHq-FwDpSg4OxlD_54/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL3RodW1icy82/MWZhZTJkMzk1ZTZj/YTAwMDQ3YjRmMTIu/cG5n"
            alt="Company 5"
          />
          <img
            src="https://imgs.search.brave.com/b1zQCpg6Hq0JGfGVkzJvMXyvBw_ZYvmrlRgw6itAC_0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJ1cGxvYWQv/MjgzOTU3NzEvZmls/ZS9vcmlnaW5hbC1m/ZWRhN2RhNDUwM2Uw/ZDBiN2M4NWY3MGQx/OWU5NmVkMC5qcGc_/Zm9ybWF0PXdlYnAm/cmVzaXplPTQwMHgz/MDAmdmVydGljYWw9/Y2VudGVy"
            alt="Company 6"
          />
          <img
            src="https://imgs.search.brave.com/Qgm1qSN6p52u3hK7BOAKQrzo8Ya7YUjcosDOzy7_EvE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3Jvd2RzcHJp/bmcuY29tL2Jsb2cv/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MDgvMTcwMzA5MTkv/YXBwbGUtbG9nby01/LmpwZWc"
            alt="Company 7"
          />
          <img
            src="https://imgs.search.brave.com/unuPPtN1u94JRAd7LMJoqNtLE6oSZs8ERAl-TH0Qx9M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzcvMS9qcG1vcmdh/bi1sb2dvLXBuZ19z/ZWVrbG9nby03NjE5/Ny5wbmc"
            alt="Company 8"
          />
        </div>
        <p style={{ marginTop: "1rem", fontSize: "1rem" }}>And many more...</p>
      </div>

      <Footer />
    </>
  );
}
