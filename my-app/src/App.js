import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FaInstagram, FaBars, FaTimes } from 'react-icons/fa';

// スタイル付きコンポーネント
const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
`;

const Section = styled.section`
  padding: 3rem 1.5rem;
  width: 100%;
  
  @media (min-width: 768px) {
    padding: 5rem 2rem;
  }
`;

// ヘッダーセクション
const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1.5rem;
  background-color: var(--color-bg);
  z-index: 1010;
`;

const Logo = styled.div`
  width: 50px;
  height: 50px;
  background-image: url('/haku_gashi_tw/logo.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: auto;
`;

// ヒーローセクション
const Hero = styled.div`
  position: relative;
  height: 70vh;
  min-height: 300px;
  background-color: var(--color-accent1);
  margin-bottom: 2rem;
  overflow: hidden;
`;

const HeroImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/haku_gashi_tw/hero.jpg'); // ヒーロー画像
  background-size: cover;
  background-position: center;
`;

const HeroText = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
  text-align: center;
  color: white;
  padding: 0 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

// HeroTitle コンポーネントは削除されているようなので、警告を解決するためにコメントアウト
// const HeroTitle = styled.h2`
//   font-size: 2.5rem;
//   margin-bottom: 1rem;
//   font-family: var(--font-title);
//   
//   @media (min-width: 768px) {
//     font-size: 3.5rem;
//   }
// `;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  font-family: var(--font-serif);
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

// コンテンツセクション
const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--color-accent1);
  }
`;

const AboutContent = styled.div`
  font-family: var(--font-serif);
  line-height: 1.8;
  max-width: 600px;
`;

// メニューセクション
const MenuSection = styled(Section)`
  background-color: rgba(216, 196, 160, 0.1);
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MenuItem = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const MenuImage = styled.div`
  height: 200px;
  background-image: url(${props => props.image || 'https://source.unsplash.com/random/400x400/?dessert'});
  background-size: cover;
  background-position: center;
`;

const MenuInfo = styled.div`
  padding: 1.5rem;
`;

const MenuName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const MenuDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

// お知らせセクション
const NoticeSection = styled(Section)`
  text-align: center;
  background-color: rgba(181, 148, 125, 0.1);
`;

const NoticeText = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
`;

// インスタグラムギャラリー
const GallerySection = styled(Section)`
  padding-top: 2rem;
  padding-bottom: 2rem;
  text-align: center;
`;

const InstagramContainer = styled.div`
  max-width: 540px;
  margin: 0 auto;
`;

// InstagramEmbed コンポーネント
const InstagramEmbed = styled.div`
  margin: 0 auto;
  max-width: 100%;
  
  iframe {
    border: none !important;
  }
`;

// InstagramPost コンポーネント
const InstagramPost = ({ postUrl }) => {
  return (
    <InstagramEmbed>
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={postUrl}
        data-instgrm-version="14"
        style={{ 
          background: '#FFF', 
          border: 0, 
          borderRadius: '8px', 
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
          margin: '1px', 
          maxWidth: '540px', 
          minWidth: '326px', 
          padding: 0,
          width: '99.375%' 
        }}
      >
        <div style={{ padding: '16px' }}>
          <a 
            href={postUrl}
            style={{ 
              background: '#FFFFFF', 
              lineHeight: 0, 
              padding: '0 0', 
              textAlign: 'center', 
              textDecoration: 'none', 
              width: '100%' 
            }} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            インスタグラム投稿を表示
          </a>
        </div>
      </blockquote>
    </InstagramEmbed>
  );
};

// フッター
const Footer = styled.footer`
  background-color: var(--color-accent2);
  color: white;
  padding: 2rem 1.5rem;
  text-align: center;
  position: relative;
`;

const FooterContent = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`;

const InstagramLink = styled.a`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 0.5rem;
  }
`;

// ハンバーガーメニュー
const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1020;
  position: relative;
  width:40px;
  height: 40px;
`;

const MenuButtonInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const MenuButtonLine = styled.span`
  display: block;
  position: absolute;
  height: 1px;
  width: 100%;
  background-color: #333;
  border-radius: 1px;
  left: 0;
  transition: all 0.25s ease-in-out;

  &:nth-child(1) {
    top: ${props => props.isOpen ? '50%' : '20%'};
    transform: ${props => props.isOpen ? 'translateY(-50%) rotate(45deg)' : 'rotate(0)'};
  }

  &:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
    opacity: ${props => props.isOpen ? '0' : '1'};
  }

  &:nth-child(3) {
    bottom: ${props => props.isOpen ? '50%' : '20%'};
    transform: ${props => props.isOpen ? 'translateY(50%) rotate(-45deg)' : 'rotate(0)'};
  }
`;

// メニューパネル
const MenuPanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  padding: 5rem 1.5rem 2rem;
  z-index: 1001;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  
  @media (min-width: 768px) {
    width: 300px;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavMenuItem = styled.li`
  margin-bottom: 1.5rem;
`;

const MenuLink = styled.button`
  background: none;
  border: none;
  font-size: 1.1rem;
  color: #333;
  cursor: pointer;
  font-family: var(--font-serif);
  padding: 0.5rem 0;
  text-align: left;
  width: 100%;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-accent1);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out;
  z-index: 1000;
`;

function App() {
  // メニューの開閉状態
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 各セクションへの参照
  const aboutRef = useRef(null);
  const menuRef = useRef(null);
  const noticeRef = useRef(null);
  const instagramRef = useRef(null);
  
  // メニューを開閉する関数
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // 指定したセクションにスクロールする関数
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };
  
  // ボディのスクロールをロックする
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Instagram埋め込みスクリプトの読み込み
  useEffect(() => {
    // 既存のスクリプトタグを確認
    const existingScript = document.getElementById('instagram-embed-script');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        if (window.instgrm) {
          console.log('Instagram Embeds APIが読み込まれました');
          window.instgrm.Embeds.process();
        }
      };
      
      document.body.appendChild(script);
    } else {
      // スクリプトが既に存在する場合は再処理
      if (window.instgrm) {
        console.log('Instagram Embedsを再処理します');
        window.instgrm.Embeds.process();
      }
    }
    
    return () => {
      // クリーンアップは必要ない
    };
  }, []);

  // ダミーのInstagram投稿URL
  const instagramPost = "https://www.instagram.com/p/DIbStv1SpZ6/";  // Instagramの投稿

  return (
    <Container>
      {/* ヘッダーセクション */}
      <Header>
        <Logo></Logo>
        <MenuButton onClick={toggleMenu} aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}>
          <MenuButtonInner>
            <MenuButtonLine isOpen={isMenuOpen} />
            <MenuButtonLine isOpen={isMenuOpen} />
            <MenuButtonLine isOpen={isMenuOpen} />
          </MenuButtonInner>
        </MenuButton>
      </Header>
      
      {/* メニューパネル */}
      <MenuPanel isOpen={isMenuOpen}>
        <MenuList>
          <NavMenuItem>
            <MenuLink onClick={() => scrollToSection(aboutRef)}>關於</MenuLink>
          </NavMenuItem>
          <NavMenuItem>
            <MenuLink onClick={() => scrollToSection(menuRef)}>聖代刨冰</MenuLink>
          </NavMenuItem>
          <NavMenuItem>
            <MenuLink onClick={() => scrollToSection(noticeRef)}>預約・訊息</MenuLink>
          </NavMenuItem>
          <NavMenuItem>
            <MenuLink onClick={() => scrollToSection(instagramRef)}>Instagram</MenuLink>
          </NavMenuItem>
        </MenuList>
      </MenuPanel>
      
      {/* オーバーレイ */}
      <Overlay isOpen={isMenuOpen} onClick={toggleMenu} />
      
      {/* ヒーローセクション */}
      <Hero>
        <HeroImage />
        <HeroText>
          <HeroSubtitle>白のやわらかさ、静かにとける時間</HeroSubtitle>
        </HeroText>
      </Hero>
      
      {/* Aboutセクション */}
      <Section ref={aboutRef}>
        <SectionTitle>關於</SectionTitle>
        <AboutContent>
          <p>這是一間壽命只有三年的聖代刨冰店</p>
          <p>12季 約26000個席</p>
          <p>這三年裡會復刻記憶中</p>
          <p>閉眼享受的甜點</p>
          <p>無數個細節會藏在Haku裡</p>
          <p>不用尋思 Haku 會告訴你</p>
        </AboutContent>
      </Section>
      
      {/* メニューセクション */}
      <MenuSection ref={menuRef}>
        <SectionTitle>聖代刨冰</SectionTitle>
        <MenuGrid>
          <MenuItem>
            <MenuImage image="/haku_gashi_tw/menu1.jpg" />
            <MenuInfo>
              <MenuName>草莓白雪聖代</MenuName>
              <MenuDescription>以當季草莓結合手作奶霜，營造出冬雪融化般的柔滑體驗。</MenuDescription>
            </MenuInfo>
          </MenuItem>
          
          <MenuItem>
            <MenuImage image="/haku_gashi_tw/menu2.jpg" />
            <MenuInfo>
              <MenuName>焙茶白玉冰</MenuName>
              <MenuDescription>日本焙茶與手作白玉完美結合，茶香與米香層層堆疊。</MenuDescription>
            </MenuInfo>
          </MenuItem>
          
          <MenuItem>
            <MenuImage image="/haku_gashi_tw/menu3.jpg" />
            <MenuInfo>
              <MenuName>焦糖牛奶雪花冰</MenuName>
              <MenuDescription>手炒焦糖與鮮乳交織，香濃綿密。</MenuDescription>
            </MenuInfo>
          </MenuItem>
        </MenuGrid>
      </MenuSection>
      
      {/* お知らせセクション */}
      <NoticeSection ref={noticeRef}>
        <SectionTitle>預約・訊息</SectionTitle>
        <NoticeText>
          📅 目前尚在準備中，敬請期待。<br />
          所有更新將於 Instagram 公布。
        </NoticeText>
      </NoticeSection>
      
      {/* インスタグラムギャラリー */}
      <GallerySection ref={instagramRef}>
        <SectionTitle>Instagram</SectionTitle>
        <InstagramContainer>
          <InstagramPost postUrl={instagramPost} />
        </InstagramContainer>
      </GallerySection>
      
      {/* フッター */}
      <Footer>
        <FooterContent>
          <InstagramLink href="https://www.instagram.com/haku_gashi_tw" target="_blank" rel="noopener noreferrer">
            <FaInstagram /> haku_gashi_tw
          </InstagramLink>
          <p>所在地：台中市（詳細地址未定）</p>
          <p>開放日與營業時間請見 IG 公告</p>
        </FooterContent>
      </Footer>
    </Container>
  );
}

export default App;
