import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FaInstagram, FaBars, FaTimes } from 'react-icons/fa';

// スタイル付きコンポーネント
const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  background-image: url('/haku_gashi_tw/bg.png');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
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

// 固定ヘッダー要素
const FixedHeaderElements = styled.div`
  position: fixed;
  top: 1rem;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  z-index: 1020;
  pointer-events: none; // 下層要素のクリックを可能にする
`;

const FixedLogo = styled.a`
  width: 50px;
  height: 50px;
  background-image: url('/haku_gashi_tw/logo.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: auto;
  pointer-events: auto; // ロゴだけクリック可能に
  cursor: pointer;
  display: block;
`;

const FixedMenuButtonContainer = styled.div`
  pointer-events: auto; // メニューボタンだけクリック可能に
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
  background-image: url('/haku_gashi_tw/store1.JPG'); // ヒーロー画像
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
  text-align: center;
  
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

// セクション内容を中央寄せにするためのスタイル
const SectionTitleContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
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
  min-height: 400px;

  &:hover {
    transform: translateY(-5px);
  }
`;

const MenuImage = styled.div`
  height: 350px;
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
  background-color: rgba(0,0,0,0.6);
  color: white;
  padding: 1rem 1.5rem;  /* 2rem から 1rem に変更して縦幅を縮小 */
  text-align: center;
  position: relative;
`;

const FooterContent = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  z-index: 1;  /* コンテンツを半透明オーバーレイの上に表示 */
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
  background-image: url('/haku_gashi_tw/bg.png');
  background-size: cover;
  background-position: center;
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
      {/* 固定ヘッダー要素 - スクロールしても表示 */}
      <FixedHeaderElements>
        <FixedLogo href="https://twsho.github.io/haku_gashi_tw/" />
        <FixedMenuButtonContainer>
          <MenuButton onClick={toggleMenu} aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}>
            <MenuButtonInner>
              <MenuButtonLine isOpen={isMenuOpen} />
              <MenuButtonLine isOpen={isMenuOpen} />
              <MenuButtonLine isOpen={isMenuOpen} />
            </MenuButtonInner>
          </MenuButton>
        </FixedMenuButtonContainer>
      </FixedHeaderElements>
      
      {/* ヘッダーセクション */}
      <Header>
        {/* オリジナルのロゴは非表示にして位置だけ保持 */}
        <div style={{ opacity: 0, visibility: 'hidden' }}>
          <Logo></Logo>
        </div>
        {/* オリジナルのメニューボタンは視覚的に非表示にするが、レイアウト上の位置は保持 */}
        <div style={{ opacity: 0, visibility: 'hidden' }}>
          <MenuButton aria-hidden="true">
            <MenuButtonInner>
              <MenuButtonLine />
              <MenuButtonLine />
              <MenuButtonLine />
            </MenuButtonInner>
          </MenuButton>
        </div>
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
        <SectionTitleContainer>
          <SectionTitle>關於</SectionTitle>
        </SectionTitleContainer>
        <AboutContent>
          <p>這是一間聖代刨冰店</p>
          <p>吃刨冰的同時能夠享有吃聖代的層次</p>
          <p>在各個季節推出當季限定旬果物</p>
          <p>重感官體驗</p>
          <p>從挑選食器到口味組合</p>
          <p>小細節不僅僅藏在冰裡，還有服務裡並讓人們吃懂、看懂、且感受到</p>
          <p>不只是吃個冰</p>
          <p>是能帶著不一樣的收穫離開。</p>
        </AboutContent>
      </Section>
      
      {/* メニューセクション */}
      <MenuSection ref={menuRef}>
        <SectionTitleContainer>
          <SectionTitle>聖代刨冰</SectionTitle>
        </SectionTitleContainer>
        <MenuGrid>
          <MenuItem>
            <MenuImage image="/haku_gashi_tw/menu_kiwi.JPG" />
            <MenuInfo>
              <MenuName>三色奇異果</MenuName>
              <MenuDescription>奇異果、葡萄柚與茉莉花三重奏，清新香氣交織</MenuDescription>
            </MenuInfo>
          </MenuItem>
          <MenuItem>
            <MenuImage image="/haku_gashi_tw/menu_goma.JPG" />
            <MenuInfo>
              <MenuName>芝麻</MenuName>
              <MenuDescription>
                芝麻、焙茶、玄米與白玉，香氣濃郁，口感層次豐富
              </MenuDescription>
            </MenuInfo>
          </MenuItem>
        </MenuGrid>
      </MenuSection>
      
      {/* お知らせセクション */}
      <NoticeSection ref={noticeRef}>
        <SectionTitleContainer>
          <SectionTitle>預約・訊息</SectionTitle>
        </SectionTitleContainer>
        <NoticeText>
          📅 目前尚在準備中，敬請期待。<br />
          所有更新將於 Instagram 公布。
        </NoticeText>
      </NoticeSection>
      
      {/* インスタグラムギャラリー */}
      <GallerySection ref={instagramRef}>
        <SectionTitleContainer>
          <SectionTitle>Instagram</SectionTitle>
        </SectionTitleContainer>
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
          <p>台中市中區光復路42-3號2樓</p>
        </FooterContent>
      </Footer>
    </Container>
  );
}

export default App;
