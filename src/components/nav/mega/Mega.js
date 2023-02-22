import React, {useState, useEffect} from 'react';
import './mega.css';
import HeaderTop from "../header2/header-top/HeaderTop";
import HeaderMiddle from "../header2/header-middle/HeaderMiddle";
import HeaderBottom from "../header2/header-bottom/HeaderBottom";

function Mega() {
    const [isMobile, setIsMobile] = useState(false);
    const [menuType, setMenuType] = useState('desktop');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 991);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) {
            setMenuType('mobile');
        } else {
            setMenuType('desktop');
        }
    }, [isMobile]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleMegaMenu = () => {
        setIsMegaMenuOpen(!isMegaMenuOpen);
    };

    const toggleSearchBox = () => {
        setIsSearchBoxOpen(!isSearchBoxOpen);
    };

    return (
        <div className="aniketrod">
            <section id="header2" className="header">
                {/*<HeaderTop/>*/}
                {/*<HeaderMiddle/>*/}
                <HeaderBottom/>


                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda distinctio dolorum laborum molestias
                mollitia quae tempore unde ut vero. Consequuntur dolores earum et magni nam pariatur placeat quis totam!
                Alias consequuntur distinctio iste minima nemo quibusdam sed suscipit, voluptatem. A aliquam aperiam aut
                beatae blanditiis consequuntur, corporis cumque deserunt ea eaque earum eius et exercitationem hic
                impedit inventore ipsa iure laboriosam magnam molestiae nemo placeat provident reiciendis veritatis
                voluptatibus. Eaque fuga illo laboriosam laudantium molestias odio totam veritatis. Adipisci aliquid
                animi assumenda autem commodi dolor dolorem explicabo facilis fugiat fugit illo ipsam laborum minima
                nostrum numquam odio officia repellendus sed similique temporibus ullam velit veniam, voluptates.
                Architecto commodi culpa cumque earum eos fugit in ipsum nisi quam. Ab alias architecto beatae corporis
                delectus dicta dignissimos dolore eveniet ex explicabo fugiat laudantium, minima nemo nesciunt
                perferendis perspiciatis sint velit vero voluptate voluptatum. Autem delectus deleniti, dolores et ipsam
                nesciunt nisi nulla pariatur placeat quam quos sit unde, veritatis? Animi, blanditiis cum enim explicabo
                illum tempora. Ab aliquid culpa nesciunt perspiciatis porro quaerat, quidem rem sint! Adipisci et illum
                nam quia quis! Ab alias animi aspernatur beatae consectetur debitis dolorem doloremque dolores ea earum
                eius fugiat hic magni nemo nihil nisi, non obcaecati porro qui quia quisquam quos similique tenetur
                veniam voluptas voluptate voluptatum? Architecto culpa distinctio dolorem est fugit illum incidunt
                laudantium nisi obcaecati optio provident, suscipit voluptas voluptatem. Assumenda dolorum fugit iusto.
                Architecto dignissimos nesciunt odio quam, sed sint tempora. Accusamus accusantium aliquid, aspernatur
                cum debitis delectus dicta dignissimos dolore dolorem doloremque ducimus ea eaque eius eos eum expedita
                facere harum illum ipsa itaque iusto laboriosam minima neque nisi nulla numquam odit perspiciatis
                possimus quaerat qui sapiente similique soluta tempore unde vel veniam voluptatibus? Aliquid dolor
                ducimus ea eaque eos facere, fuga maiores nam non odio pariatur praesentium quidem similique suscipit
                ut. Ad assumenda, at cumque dolorem inventore mollitia nam, nobis odio, placeat quae quam quasi quisquam
                repellendus sequi voluptates! Alias animi aperiam at cupiditate delectus dolores enim id impedit ipsam
                iure libero molestiae molestias nam necessitatibus neque nisi non obcaecati quia quibusdam quis
                recusandae, sunt suscipit ut vel veniam vero voluptatum. Beatae cupiditate deserunt dolorem doloribus
                eius et ipsam maxime nam necessitatibus nisi optio pariatur praesentium quod quos ratione recusandae
                repellendus, sapiente totam. Aspernatur culpa placeat quaerat sequi voluptate? Ab aliquid dicta dolores
                eveniet fugiat fugit impedit ipsa, laboriosam laudantium omnis praesentium quisquam rerum sed sint velit
                vitae voluptatum. Aliquam enim error exercitationem harum iste laudantium neque praesentium repellendus
                veniam voluptatum! Dolorem dolorum ea fuga itaque laudantium nisi nulla perferendis soluta ullam? At,
                deleniti dolorem molestiae nemo nostrum rem sunt! Alias aliquam architecto corporis deserunt eius id
                impedit laudantium nostrum, officiis sapiente similique ut. Accusamus aliquid architecto asperiores
                corporis cum deleniti dolores doloribus, ducimus inventore itaque, laborum molestias nobis non nostrum
                perferendis sunt tenetur, totam ut voluptate voluptates. Ab accusamus accusantium ad aperiam assumenda
                blanditiis deleniti distinctio dolor doloremque eaque error et eveniet excepturi, exercitationem in iste
                minus modi nisi odio pariatur perferendis quam quasi quidem quod reiciendis repudiandae sint soluta
                tempora temporibus tenetur totam velit voluptas voluptate! Accusantium animi assumenda corporis cum
                deserunt ea esse fugiat illo incidunt ipsa ipsum iure libero, magnam magni, maxime, minima mollitia nemo
                obcaecati odit omnis pariatur perferendis quibusdam quo repellat sequi sint sit soluta suscipit tempora
                ullam vel voluptatem voluptates voluptatum. Aliquid aperiam aspernatur autem corporis culpa dolor
                doloribus ducimus, enim expedita fugit impedit in maiores necessitatibus nobis officiis perferendis quis
                reiciendis reprehenderit sed vero. Consectetur consequuntur, debitis delectus doloremque eos excepturi
                explicabo facilis inventore, labore, magnam placeat possimus praesentium provident quia saepe sunt
                voluptatibus! Aliquid aperiam architecto beatae, dignissimos, ducimus error esse facilis iste iure
                labore laudantium necessitatibus nostrum officia officiis perferendis, perspiciatis placeat quidem quo
                quos similique? Amet aspernatur culpa cupiditate fuga id inventore ipsum nemo, officiis sit soluta. Ab,
                aspernatur delectus dolor explicabo labore laborum, libero molestias nobis optio saepe sapiente
                similique vero! Architecto excepturi itaque magni modi mollitia quos. Ab at, consectetur consequatur
                culpa cupiditate dicta dolor ex, id ipsa iste necessitatibus odio optio repudiandae sed voluptatibus? Ab
                aspernatur at consectetur consequatur dolor est fugiat harum illo incidunt itaque nihil nulla optio,
                placeat quam quia quibusdam soluta, vitae. Assumenda corporis cum eius enim fugit, libero placeat
                recusandae sit tempora voluptate? Ab aspernatur cupiditate hic impedit molestiae molestias nemo possimus
                unde velit. Ad commodi corporis, cum debitis dicta dignissimos dolorem eius fuga harum id in, itaque
                laborum minima molestias natus non obcaecati optio quia, quibusdam reiciendis sint sit temporibus
                veritatis! Architecto ducimus ex excepturi inventore labore laboriosam maxime natus necessitatibus odio,
                perferendis quisquam, quod ratione repellendus reprehenderit saepe, velit veritatis. Consequuntur eos
                nulla quos! Ad assumenda dolores ducimus ex explicabo iusto molestiae necessitatibus nobis quas
                quibusdam. Accusamus assumenda distinctio dolore eaque magnam perferendis quidem, sit veritatis
                voluptas. Ab aliquid atque autem culpa eius, esse eum iure odit, ratione reprehenderit repudiandae sint?
                Deleniti dicta dignissimos dolor earum et exercitationem harum hic illum itaque minus, quaerat quo
                sapiente similique suscipit ullam vero voluptatibus! Enim esse iure optio provident quae reiciendis. A
                ab, assumenda dolore dolorem esse impedit, magni modi necessitatibus nostrum obcaecati possimus qui
                saepe sequi similique, suscipit veritatis voluptas. Architecto blanditiis consectetur illo iusto nihil
                obcaecati odio sint? Accusamus adipisci aliquam aperiam aspernatur commodi consectetur cum debitis
                deserunt dicta dolore ea earum eius eos error esse fugiat inventore ipsa iste libero magni minima
                necessitatibus neque nisi nulla numquam porro quaerat quia, quidem quis reprehenderit sapiente tempora
                vel velit. Adipisci alias aperiam assumenda culpa debitis distinctio dolorem eveniet illo ipsa ipsam
                iusto libero natus nesciunt nihil, placeat porro possimus quam quibusdam, quisquam repellendus sapiente
                soluta temporibus unde veniam voluptatum? Assumenda cum cumque deserunt est fugiat hic inventore itaque
                non, odit quo. Ab accusantium adipisci architecto aspernatur dolores eaque excepturi facere fugiat id in
                inventore ipsa iste libero nulla odio odit officiis perspiciatis quae quasi qui quis quo quos,
                recusandae rem reprehenderit soluta voluptatum. Delectus doloremque ducimus minus mollitia nemo placeat
                quo. Deleniti facilis, maxime optio quibusdam sequi tempora voluptatibus. Accusantium beatae harum illo
                inventore ipsum officia praesentium ratione! Eum perferendis, quis.
            </section>

        </div>


    );
}

export default Mega;
