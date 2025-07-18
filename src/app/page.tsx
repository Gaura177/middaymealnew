"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./homepage.module.css";

export default function Home() {
  useEffect(() => {
    // Countdown Timer
    const countdown = () => {
      // To change the countdown date, modify the following line with your desired date.
      // For example: new Date("Dec 31, 2025 23:59:59")
      const countDate = new Date("Aug 15, 2025 00:00:00").getTime();
      const now = new Date().getTime();
      const gap = countDate - now;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const textDay = Math.floor(gap / day);
      const textHour = Math.floor((gap % day) / hour);
      const textMinute = Math.floor((gap % hour) / minute);
      const textSecond = Math.floor((gap % minute) / second);

      const daysEl = document.getElementById("days");
      const hoursEl = document.getElementById("hours");
      const minutesEl = document.getElementById("minutes");
      const secondsEl = document.getElementById("seconds");

      if (daysEl) daysEl.innerText = String(textDay);
      if (hoursEl) hoursEl.innerText = String(textHour);
      if (minutesEl) minutesEl.innerText = String(textMinute);
      if (secondsEl) secondsEl.innerText = String(textSecond);
    };
    const countdownInterval = setInterval(countdown, 1000);

    // Chart Animation
    const animateChart = () => {
      const bars = document.querySelectorAll("[id^='chart']");
      bars.forEach((bar) => {
        const height = Math.random() * 80 + 10;
        (bar as HTMLElement).style.height = `${height}px`;
      });
    };
    const chartInterval = setInterval(animateChart, 2000);
    animateChart();

    // Height Animation
    const animateHeight = () => {
      const bars = document.querySelectorAll("[id^='height']");
      bars.forEach((bar) => {
        const height = Math.random() * 40 + 10;
        (bar as HTMLElement).style.height = `${height}px`;
      });
    };
    const heightInterval = setInterval(animateHeight, 3000);
    animateHeight();

    return () => {
      clearInterval(countdownInterval);
      clearInterval(chartInterval);
      clearInterval(heightInterval);
    };
  }, []);

  return (
    <div className={styles.homepage}>
      <div className={styles["bg-grid"]}></div>
      <div className={styles["bg-gradient"]}></div>

      <div className={styles.container}>
        <Image
          src="/hubnew.png"
          alt="MiddayHub Logo"
          width={350}
          height={100}
          className={styles.logo}
        />
        <p className={styles.tagline}>Smart Midday Meal Monitoring System</p>

        <div className={styles["monitoring-system"]}>
          <div className={styles["system-glow"]}></div>

          {/* CCTV Food Monitoring System */}
          <div className={styles["cctv-system"]}>
            <div className={styles["cctv-label"]}>CCTV FOOD WEIGHT DETECTION</div>
            <div className={styles["cctv-monitor"]}>
              <div className={styles["cctv-screen"]}>
                <div className={styles["food-view"]}>
                  <div className={styles["food-plate"]}>
                    <div className={styles["food-item"]}></div>
                    <div className={styles["food-item"]}></div>
                    <div className={styles["food-item"]}></div>
                  </div>
                  <div className={styles["weight-scan"]}></div>
                  <div className={styles["scan-data"]}>248.5 g</div>
                </div>
              </div>
              <div className={styles["cctv-status"]}></div>
              <div className={styles["cctv-controls"]}>
                <div className={styles["control-btn"]}></div>
                <div className={styles["control-btn"]}></div>
                <div className={styles["control-btn"]}></div>
              </div>
            </div>
          </div>

          {/* Student Monitoring System */}
          <div className={styles["student-system"]}>
            <div className={styles["student-label"]} style={{ whiteSpace: "nowrap" }}>
              STUDENT HEIGHT/WEIGHT TRACKING
            </div>
            <div className={styles["student-monitor"]}>
              <div className={styles["student-screen"]}>
                <div className={styles["student-view"]}>
                  <div className={styles["student-figure"]}>
                    <div className={styles["student-head"]}></div>
                    <div className={styles["student-body"]}></div>
                    <div className={styles["height-bar"]} id="height1"></div>
                    <div className={styles["height-label"]}>132cm</div>
                  </div>
                  <div className={styles["student-figure"]}>
                    <div className={styles["student-head"]}></div>
                    <div className={styles["student-body"]}></div>
                    <div className={styles["height-bar"]} id="height2"></div>
                    <div className={styles["height-label"]}>128cm</div>
                  </div>
                  <div className={styles["student-figure"]}>
                    <div className={styles["student-head"]}></div>
                    <div className={styles["student-body"]}></div>
                    <div className={styles["height-bar"]} id="height3"></div>
                    <div className={styles["height-label"]}>135cm</div>
                  </div>
                  <div className={styles["student-figure"]}>
                    <div className={styles["student-head"]}></div>
                    <div className={styles["student-body"]}></div>
                    <div className={styles["height-bar"]} id="height4"></div>
                    <div className={styles["height-label"]}>130cm</div>
                  </div>
                </div>
                <div className={styles["height-scan"]}></div>
              </div>
            </div>
          </div>

          {/* Analytics Dashboard */}
          <div className={styles["analytics-system"]}>
            <div
              className={styles["analytics-label"]}
              style={{ width: "100%", textAlign: "center" }}
            >
              MONITORING ANALYTICS
            </div>
            <div className={styles["analytics-panel"]}>
              <div className={styles["metrics-section"]}>
                <div className={styles["metrics-title"]}>Key Metrics</div>
                <div className={styles["metric-row"]}>
                  <div className={styles["metric-label"]}>Avg. Meal Weight:</div>
                  <div className={`${styles["metric-value"]} ${styles.neutral}`}>245.7g</div>
                </div>
                <div className={styles["metric-row"]}>
                  <div className={styles["metric-label"]}>Growth Rate:</div>
                  <div className={`${styles["metric-value"]} ${styles.positive}`}>+2.3cm/yr</div>
                </div>
                <div className={styles["metric-row"]}>
                  <div className={styles["metric-label"]}>Nutrition Compliance:</div>
                  <div className={styles["metric-value"]}>98.2%</div>
                </div>
                <div className={styles["metric-row"]}>
                  <div className={styles["metric-label"]}>Meal Distribution:</div>
                  <div className={`${styles["metric-value"]} ${styles.positive}`}>Optimal</div>
                </div>
              </div>
              <div className={styles["chart-section"]}>
                <div className={styles["chart-title"]}>
                  Midday Meal Impact Analysis
                </div>
                <div className={styles["chart-container"]}>
                  <div className={styles["chart-bar"]} id="chart1"></div>
                  <div className={styles["chart-bar"]} id="chart2"></div>
                  <div className={styles["chart-bar"]} id="chart3"></div>
                  <div className={styles["chart-bar"]} id="chart4"></div>
                  <div className={styles["chart-bar"]} id="chart5"></div>
                  <div className={styles["chart-bar"]} id="chart6"></div>
                </div>
                <div className={styles["chart-label"]}>
                  <span>Q1</span>
                  <span>Q2</span>
                  <span>Q3</span>
                  <span>Q4</span>
                  <span>Q5</span>
                  <span>Q6</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Lines */}
          <div className={styles["connection-lines"]}>
            <div className={`${styles.connection} ${styles.one}`}></div>
            <div className={`${styles.connection} ${styles.two}`}></div>
            <div className={`${styles.connection} ${styles.three}`}></div>
            <div className={`${styles.connection} ${styles.four}`}></div>
          </div>
        </div>

        <div className={styles.countdown}>
            <div className={styles["countdown-item"]}>
                <div className={styles["countdown-number"]} id="days">30</div>
                <div className={styles["countdown-label"]}>Days</div>
            </div>
            <div className={styles["countdown-item"]}>
                <div className={styles["countdown-number"]} id="hours">24</div>
                <div className={styles["countdown-label"]}>Hours</div>
            </div>
            <div className={styles["countdown-item"]}>
                <div className={styles["countdown-number"]} id="minutes">60</div>
                <div className={styles["countdown-label"]}>Minutes</div>
            </div>
            <div className={styles["countdown-item"]}>
                <div className={styles["countdown-number"]} id="seconds">60</div>
                <div className={styles["countdown-label"]}>Seconds</div>
            </div>
        </div>
        
        <div className={styles["coming-soon-text"]}>
          <Link href="/register" className={styles["get-started-btn"]}>
            Get Started
          </Link>
        </div>

        <div className={styles.partners}>
          <div className={styles.partner}>
            <div className={styles["partner-label"]}>Developed by</div>
            <div
              className={styles["partner-logo"]}
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            >
              <Image
                src="/empi_logo.png"
                alt="EMPI Innovation Hub"
                width={150}
                height={75}
                style={{ filter: "brightness(2) contrast(1.2)" }}
              />
            </div>
          </div>
          <div className={styles.partner}>
            <div className={styles["partner-label"]}>Supported by</div>
            <div
              className={styles["partner-logo"]}
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            >
              <Image
                src="/iit_roorkee_logo.png"
                alt="IIT Roorkee"
                width={150}
                height={75}
                style={{ filter: "brightness(2) contrast(1.2)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
