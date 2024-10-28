import React from "react";
import "./Footer.css";
import logoImage from "../../assets/homepage/logo-black-full.png";
import { FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="ft_footer-container">
			<div className="ft_footer-content">

				<div className="ft_contact-section">
					<img src={logoImage} alt="MUT Logo" className="ft_mut-logo" />
					<div className="ft_social-links">
						<a href="#">
							<FaFacebook /> 029883650-66 ต่อ 1105 - 1107
						</a>
						<a href="#">
							<FaYoutube /> 02-988-4021-4 (สมัครเรียน)
						</a>
						<p>มหาวิทยาลัยเทคโนโลยีมหานคร</p>
						<p>140 ถนนเชื่อมสัมพันธ์ แขวงกระทุ่มราย เขตหนองจอก กรุงเทพฯ 10530</p>
					</div>
				</div>

				<div className="ft_link-sections">
					<div className="ft_link-group">
						<h4>เกี่ยวกับมหาวิทยาลัย</h4>
						<ul>
							<li><a href="#">เกี่ยวกับมหานคร</a></li>
							<li><a href="#">Art for Life</a></li>
							<li><a href="#">Privacy Policy</a></li>
							<li><a href="#">Cookie Policy</a></li>
						</ul>
					</div>
					<div className="ft_link-group">
						<h4>ข้อมูลติดต่อ</h4>
						<ul>
							<li><a href="#">บุคลากร</a></li>
							<li><a href="#">ติดต่อเรา</a></li>
							<li><a href="#">หน่วยงานภายใน</a></li>
							<li><a href="#">ร่วมงานกับมหาวิทยาลัย</a></li>
							<li><a href="#">แผนที่ภายในมหาวิทยาลัย</a></li>
						</ul>
					</div>
					<div className="ft_link-group">
						<h4>เกี่ยวกับนักศึกษา</h4>
						<ul>
							<li><a href="#">ปฏิทินการศึกษา</a></li>
							<li><a href="#">ข้อบังคับ และระเบียบ</a></li>
							<li><a href="#">ค่าเทอมและทุน</a></li>
							<li><a href="#">สำนักทะเบียน</a></li>
							<li><a href="#">กองทุนกู้ยืมเพื่อการศึกษา</a></li>
						</ul>
					</div>
				</div>

			</div>
			<div className="ft_footer-bottom">
				<p>Copyright© Mahanakorn University of Technology 2022. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
